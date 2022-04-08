import { query as q } from 'faunadb';

import { client } from './fauna';

const match = (code: string, granter: string) =>
  q.Match(q.Index('codes__uniq_by_granter'), code, granter);

const only = (expr: q.ExprArg) => q.Select(['ref'], q.Get(expr));

export async function upsertValidCode(code: string, granter: string) {
  return await client.query(
    q.If(
      q.Exists(match(code, granter)),
      q.Update(only(match(code, granter)), { data: { code, granter } }),
      q.Create(q.Collection('codes'), { data: { code, granter } }),
    ),
  );
}

export async function consumeCodeIfExists(code: string, granter: string): Promise<void> {
  const result = await client.query<null | { data: { code: string } }>(
    q.If(
      q.Exists(match(code, granter)), //
      q.Delete(only(match(code, granter))),
      null,
    ),
  );

  // code did not exist
  if (result === null) {
    throw new Error('INVALID_CODE');
  }

  return;
}
