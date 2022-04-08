import { Button, Text, VStack } from '@chakra-ui/react';
import { CodeInput } from 'client/components/CodeInput';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

function Dashboard() {
  const router = useRouter();
  const issuer = router.query.issuer as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [data, setData] = useState<{ code: string }>(null);

  const [code, setCode] = useState('');

  const handleNewCode = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/new_code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issuer, code }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [code, issuer]);

  return (
    <VStack>
      <CodeInput setCode={setCode} />
      <Button onClick={handleNewCode} disabled={!code}>
        Persist Code
      </Button>
      {loading && <Text>loading...</Text>}
      {data && <Text>persisted!</Text>}
      {error && <Text>{error.message}</Text>}
    </VStack>
  );
}

export default Dashboard;
