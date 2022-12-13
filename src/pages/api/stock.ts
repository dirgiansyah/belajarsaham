import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    try {

        const {
            url
        } = req.body

        let defaultAxios = axios.create({
            baseURL: 'https://pasardana.id/api/',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip',
                Host: 'pasardana.id',
                Pragma: 'no-cache',
                Referer: 'https://pasardana.id/stock/search',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
            },
        });
        let dataAxios = await defaultAxios.get(url ?? "/StockSearchResult/GetAll")
        return res.json(dataAxios.data)
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}
