// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { postDetailQuery } from '@/utils/queries';
import { client } from '@/utils/client';
import { uuid } from 'uuidv4'

export default async function handler(req: NextApiRequest,
res: NextApiResponse) {
  if(req.method === 'GET') {
    const { id } = req.query;
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } else if(req.method === 'PUT') {
    const { komentar, korisnikId } = req.body;
    const { id }:any = req.query;

    const data =await client
    .patch(id)
    .setIfMissing({ komentari: [] })
    .insert('after', 'komentari[-1]', [
      {
        komentar,
        _key: uuid(),
        postavio: {_type: 'postavio', _ref: korisnikId}
      },
    ])
    .commit()

    res.status(200).json(data);
  }
}