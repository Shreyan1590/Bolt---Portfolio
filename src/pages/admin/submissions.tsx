// pages/admin/submissions.tsx
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../../lib/mongodb';
import { MagnifyingGlass, Trash, Download, CaretLeft, CaretRight } from 'phosphor-react';
import { GetServerSideProps } from 'next';
import { ObjectId } from 'mongodb';

interface Submission {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface SubmissionsPageProps {
  submissions: Submission[];
  error?: string;
}

export default function Submissions({ submissions: initialSubmissions, error: initialError }: SubmissionsPageProps) {
  const [submissionsList, setSubmissionsList] = useState<Submission[]>(initialSubmissions);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(initialError);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Filter and paginate submissions
  const filteredSubmissions = submissionsList.filter(sub => 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${sub.firstName} ${sub.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  // Refresh submissions
  const refreshSubmissions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/get-submissions');
      const { submissions } = await res.json();
      setSubmissionsList(submissions);
      setError(undefined);
    } catch (err) {
      setError('Failed to refresh submissions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete submission
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      const response = await fetch('/api/delete-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (response.ok) {
        setSubmissionsList(prev => prev.filter(s => s._id !== id));
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      setError('Failed to delete submission');
      console.error(err);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Subject', 'Message', 'Date'];
    const csvContent = [
      headers.join(','),
      ...submissionsList.map(s => 
        `"${s.firstName} ${s.lastName}","${s.email}","${s.subject}","${s.message.replace(/"/g, '""')}","${new Date(s.createdAt).toLocaleString()}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `submissions_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Form Submissions
            {filteredSubmissions.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({filteredSubmissions.length} total)
              </span>
            )}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlass size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search submissions..."
                className="pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg w-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            
            <button
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
            {error}
            <button 
              onClick={refreshSubmissions}
              className="ml-4 text-red-100 hover:text-white underline"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="p-8 text-center text-gray-400 bg-gray-800/50 rounded-lg">
            {searchTerm ? 'No matching submissions found' : 'No submissions yet'}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full bg-gray-800 text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {paginatedSubmissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{submission.firstName} {submission.lastName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`mailto:${submission.email}`} className="text-cyan-400 hover:underline">
                          {submission.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.subject}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="line-clamp-2 text-gray-300">
                          {submission.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                        {new Date(submission.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDelete(submission._id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-400">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredSubmissions.length)} of{' '}
                  {filteredSubmissions.length} entries
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 flex items-center gap-1"
                  >
                    <CaretLeft size={16} />
                    Previous
                  </button>
                  <div className="flex items-center px-3 py-1 bg-gray-800 rounded-md">
                    Page {currentPage} of {totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 flex items-center gap-1"
                  >
                    Next
                    <CaretRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<SubmissionsPageProps> = async (context) => {
  // Simple authentication check (replace with your actual auth logic)
  const { req } = context;
  if (!req.cookies.adminToken) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  try {
    const { db } = await connectToDatabase();
    const submissions = await db
      .collection('submissions')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      props: {
        submissions: JSON.parse(JSON.stringify(submissions)),
      },
    };
  } catch (err) {
    console.error('Database error:', err);
    return {
      props: {
        submissions: [],
        error: 'Failed to load submissions',
      },
    };
  }
};