import type { NextApiRequest, NextApiResponse } from 'next';

export default function mint(req: NextApiRequest, res: NextApiResponse) {
  const token = req.body.token as string;

  res.status(200).json({ token });
}
