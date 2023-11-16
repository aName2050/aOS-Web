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

    let userPreferredLanguage;
    for (let i = 0; i < supportedLanguages.length; i++) {
        if (
            userLanguages.length > 0 &&
            supportedLanguages[i] === userLanguages[0].code
        ) {
            userPreferredLanguage = userLanguages[0].code;
            break;
        } else continue;
    }

    req.lang = userPreferredLanguage || 'en'; // Defualt is en (English)

    res.header('content-language', req.lang);

    if (!req.path.startsWith(`/${req.lang}`) && !req.path.includes('/api')) {
        const newURL = `/${req.lang}${req.path.startsWith('/') ? '' : '/'}${
            req.path
        }`;

        if (supportedLanguages.includes(`${req.path.split('/')[1]}`))
            return next();

        return res.redirect(newURL);
    }

    return next();
}
