// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client';
import { searchPostsQuery } from '@/utils/queries';
export default async function handler(req: NextApiRequest,
res: NextApiResponse) {
  if(req.method === 'GET') {
    const { pretragaVrednost } = req.query;

    const videoQuery = searchPostsQuery(pretragaVrednost);

    const videi = await client.fetch(videoQuery);

    res.status(200).json(videi);
  }
}