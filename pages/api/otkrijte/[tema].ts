// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client';
import { topicPostsQuery } from '@/utils/queries';
export default async function handler(req: NextApiRequest,
res: NextApiResponse) {
  if(req.method === 'GET') {
    const { tema } = req.query;

    const videosQuery = topicPostsQuery(tema);

    const videi = await client.fetch(videosQuery);

    res.status(200).json(videi);
  }
}