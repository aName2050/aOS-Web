import express from 'express';
import path from 'path';
import * as serverConfig from '../../config/server-config.json';
import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import crypto from 'node:crypto';
import { v4 } from 'uuid';
import cookieSession from 'cookie-session';

// Handlers
import autoLanguageDetectionMiddleware from './Handlers/autoLangDetection';

// Types
import { IRequest } from '../types/express';

// Routes
/// API Routes
import OSAPIRoutes from './Routes/OS-API';
import PublicAPIRoutes from './Routes/PUBLIC-API';
import ServerAPIRoutes from './Routes/SERVER-API';

import GUIRoutes from './Routes/GUI';

export const app = express();
export const PORT = serverConfig.HTTP.PORT;

const keys: string[] = [v4(), v4()];

// Middleware
app.use('/static', express.static(path.join(__dirname, '../Client')));
app.use(autoLanguageDetectionMiddleware);
app.use(cookieParser(`${v4()}`));
app.use(
    cookieSession({
        name: 'session_token',
        keys,
        secure: true,
        httpOnly: true,
        sameSite: true,
        signed: true,
        maxAge: 12 * 60 * 60 * 1000, // 12 hours
    })
);

// API (Public API)
app.use('/public/v1/api', PublicAPIRoutes); // TODO: Public API versioning

// Server API (Private API)
app.use('/server/api', ServerAPIRoutes);

// OS API (Private API)
app.use('/client/os/system/api', OSAPIRoutes);

// GUI
app.use('/client/os/ui', GUIRoutes);

// Home
app.get('/:lang', (req: IRequest, res: Response) => {
    res.status(200).sendFile(`./src/Client/HTML/lang/${req.lang}/home.html`, {
        root: '.',
    });
});

app.get('/:lang/test', (req, res) => {
    if (req.session) req.session.test = { a: 5, b: 7 };
    console.log(req.session);
});
