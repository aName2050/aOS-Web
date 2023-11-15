import { Request, Response, NextFunction } from 'express';
import * as langParser from 'accept-language-parser';

import type { IRequest } from '../../types/express';

// Supported languages
export const supportedLanguages: string[] = ['en', 'es'];

export default function autoLanguageDetectionMiddleware(
    req: IRequest,
    res: Response,
    next: NextFunction
) {
    if (req.path.includes('/api')) return next();

    const userLanguages = langParser.parse(req.headers['accept-language']);

    const userPreferredLanguage = userLanguages.find(lang =>
        supportedLanguages.includes(lang.code)
    );

    req.lang = userPreferredLanguage?.code || 'en'; // Defualt is en (English)

    res.header('Content-Language', req.lang);

    console.log(`req.lang: ${req.lang} from ${req.path}`);

    console.log(res.headersSent);

    if (!req.path.startsWith(`/${req.lang}`) && !req.path.includes('/api')) {
        const newURL = `/${req.lang}${req.path.startsWith('/') ? '' : '/'}${
            req.path
        }`;

        if (supportedLanguages.includes(`${req.path.split('/')[1]}`))
            return next();

        return res.redirect(newURL);
    }

    next();
}
