import { Request, Response, NextFunction } from 'express';
import * as langParser from 'accept-language-parser';

import type { IRequest } from '../../types/express';

// Supported languages
const supportedLanguages: string[] = ['en', 'es'];

export default function autoLanguageDetectionMiddleware(
    req: IRequest,
    res: Response,
    next: NextFunction
) {
    const userLanguages = langParser.parse(req.headers['accept-language']);

    const userPreferredLanguage = userLanguages.find(lang =>
        supportedLanguages.includes(lang.code)
    );

    req.lang = userPreferredLanguage?.code || 'en'; // Defualt is en (English)

    if (!req.path.startsWith(`/${req.lang}`) && !req.path.includes('/api')) {
        const newURL = `/${req.lang}${req.path.startsWith('/') ? '' : '/'}${
            req.path
        }`;
        return res.redirect(newURL);
    }

    next();
}
