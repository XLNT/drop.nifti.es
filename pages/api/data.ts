import { handler, nope, yup } from 'server/lib/handler';
import { verifyGrantAndGranter } from 'server/lib/verifyGrantAndGranter';

const fetcher = (url: string) =>
  fetch(url).then(async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  });

export default handler(async function data(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return nope(res, 400, `No ${req.method}. Only GET.`);

  const issuer = req.query.issuer as string;
  const assetId = req.query.assetId as string;

  try {
    const { grant, granter, error } = verifyGrantAndGranter(issuer, assetId);
    const metadata = await fetcher(`https://use.nifti.es/api/${grant.id}`);

    res.setHeader('Cache-Control', `s-maxage=${60 * 60}`);

    return yup(res, { grant, granter, metadata, error });
  } catch (error) {
    return nope(res, 400, error.message);
  }
});
