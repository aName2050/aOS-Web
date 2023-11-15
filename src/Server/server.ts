import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import * as serverConfig from '../../config/server-config.json';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import crypto from 'node:crypto';
import { v4 } from 'uuid';

// Handlers
import autoLanguageDetectionMiddleware, {
    supportedLanguages,
} from './Handlers/autoLangDetection';

// Types
import { IRequest } from '../types/express';

// Routes
/// API Routes
import OSAPIRoutes from './Routes/OS-API';
import PublicAPIRoutes from './Routes/PUBLIC-API';
import ServerAPIRoutes from './Routes/SERVER-API';

import GUIRoutes from './Routes/GUI';

export const app: Application = express();
export const PORT = serverConfig.HTTP.PORT;

// Middleware
app.use('/static', express.static(path.join(__dirname, '../Client')));
app.use(autoLanguageDetectionMiddleware);
app.use(cookieParser(`${v4()}`));

// Home [en]
app.get('/:lang', (req: IRequest, res: Response, next: NextFunction) => {
    if (!supportedLanguages.includes(req.params.lang) && req.params.lang != '')
        return next();
    res.status(200).sendFile(
        `./src/Client/HTML/lang/${req.params.lang}/home.html`,
        {
            root: '.',
        }
    );
});

// Special Links

// API (Public API)
app.use('/api', PublicAPIRoutes); // TODO: Public API versioning

// Server API (Private API)
app.use('/server/api', ServerAPIRoutes);

// OS API (Private API)
app.use('/client/os/system/api', OSAPIRoutes);

// GUI
app.use('/client/os/ui', GUIRoutes);
