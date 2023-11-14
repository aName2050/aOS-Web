import { app, PORT } from './Server/server';
import chalk from 'chalk';

// Server
app.listen(PORT, () => {
    console.log(
        `${chalk.bgGreen.bold(' SERVER ')} ${chalk.green(
            'Listening'
        )} on port ${chalk.bold(`${PORT}`)} `
    );
});
