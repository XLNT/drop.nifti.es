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

  const token = req.query.token as string;

  try {
    const { grant, granter, error } = await verifyGrantAndGranter(token);

    const metadatas = await Promise.all(
      grant.ids
        .map((id) => ['eip155:1', `erc1155:${granter.tokenAddress}`, id].join('/'))
        .map((id) => fetcher(`https://use.nifti.es/api/${id}`)),
    );

    res.setHeader('Cache-Control', `s-maxage=${60 * 60}`);

    return yup(res, { granter, metadatas, error });
  } catch (error) {
    return nope(res, 400, error.message);
  }
});
