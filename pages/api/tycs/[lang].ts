import type { NextApiRequest, NextApiResponse } from 'next'
import { TyCsAPIResponse } from '../../../types'
import { defaultLocale, locales } from '../../../locale/constants';
import { tycs } from '../db';




export default function handler(req: NextApiRequest, res: NextApiResponse<TyCsAPIResponse>) {
    const { lang } = req.query as {lang: string}

    //simular la llamada a la bd.ts
    const tycsByLanguage = tycs[lang as string] ?? tycs[defaultLocale]

res.status(200).json(tycsByLanguage);
}