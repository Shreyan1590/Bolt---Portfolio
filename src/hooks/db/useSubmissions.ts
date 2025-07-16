import { useState, useEffect } from 'react';
import { Submission } from '../../types/mongo';

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/get-submissions');
      const { data } = await response.json();
      setSubmissions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load submissions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSubmissions();
  }, []);

  return { submissions, loading, error, refreshSubmissions };
}