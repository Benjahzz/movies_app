import { NextApiResponse, NextApiRequest } from 'next';
import axios from 'axios';
import fetcher from '@/libs/fetcher';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const headers = {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }

            const {filter} = req.query
            const url = `${process.env.TMDB_URL}movie${filter ? `/${filter}` : ""}`
            const results = await axios.get(url, {headers}).then((res) => res.data)
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
            return res.status(400).end()
        }
    }


}