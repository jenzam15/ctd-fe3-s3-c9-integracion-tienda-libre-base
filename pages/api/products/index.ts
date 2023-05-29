import type { NextApiRequest, NextApiResponse } from 'next'
import {ProductsAPIResponse} from "../../../types"
import {products} from "../db"



interface Message {
    message: string
}

type DataResponse = ProductsAPIResponse | Message

export default function handlers(req: NextApiRequest, res: NextApiResponse<DataResponse>) {
    res.status(200).json(products)
}