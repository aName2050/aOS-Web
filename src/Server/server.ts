import express from 'express';
import path from 'path';
import * as serverConfig from '../../config/server-config.json';
import chalk from 'chalk';

// Routes
import apiRoutes from './Routes/API';
import guiRoutes from './Routes/GUI';

export const app = express();
export const PORT = serverConfig.HTTP.PORT;

// Middleware
app.use('/static', express.static(path.join(__dirname, '../Client')));

// API
app.use('/client/os/system/api', apiRoutes);

// GUI
app.use('/client/os/ui', guiRoutes);

// Home
app.get('/', (req, res) => {
    res.status(200).sendFile('./src/Client/HTML/home.html', {
        root: '.',
    });
});
