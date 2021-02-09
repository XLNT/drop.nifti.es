import { useCallback, useEffect, useState } from 'react';

// could use a library here but let's keep it simple
export function useQuery<T>(
  path: string,
  params: Record<string, any>,
  { skip = false }: { skip?: boolean } = {},
) {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  const _fetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${path}?${new URLSearchParams(params)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setData(data);

      if (data.error) setError(new Error(data.error));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [params, path]);

  useEffect(() => {
    if (skip) return;
    _fetch();
  }, [_fetch, skip]);

  return { data, loading, error };
}
