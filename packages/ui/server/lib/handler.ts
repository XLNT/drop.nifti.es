import { NextApiRequest, NextApiResponse } from 'next';

export function nope(res: NextApiResponse, status: number, message: string) {
  return res.status(status).json({ message });
}

export function yup(res: NextApiResponse, body: Record<string, any>) {
  return res.status(200).json(body);
}

export function handler(handle: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handle(req, res);
    } catch (error) {
      console.error(error);
      res.status(500);

      if (process.env.NODE_ENV === 'development') {
        res.json({ message: error.message });
      }

      return res.end();
    }
  };
}
