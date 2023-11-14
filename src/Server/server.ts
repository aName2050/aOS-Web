import express from 'express';
import path from 'path';
import * as serverConfig from '../../config/server-config.json';
import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';
import * as langParser from 'accept-language-parser';

// Handlers
import autoLanguageDetectionMiddleware from './Handlers/autoLangDetection';

// Types
import { IRequest } from '../types/express';

// Routes
import apiRoutes from './Routes/API';
import guiRoutes from './Routes/GUI';

export const app = express();
export const PORT = serverConfig.HTTP.PORT;

// Middleware
app.use('/static', express.static(path.join(__dirname, '../Client')));
app.use(autoLanguageDetectionMiddleware);

// API
app.use('/client/os/system/api', apiRoutes);

// GUI
app.use('/client/os/ui', guiRoutes);

// Home
app.get('/:lang', (req: IRequest, res: Response) => {
    res.status(200).sendFile(`./src/Client/HTML/lang/${req.lang}/home.html`, {
        root: '.',
    });
});
