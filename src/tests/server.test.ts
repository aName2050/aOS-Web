import request from 'supertest';

import { app } from '../Server/server';

describe('Server and routes tests', () => {
    test('OS API', async () => {
        const res = await request(app).get('/client/os/system/api/ping');
        expect(res.body).toEqual({ message: 'Pong!' });
    });

    test('Auto Language Detection', async () => {
        const res: request.Response = await request(app).get('/');
        expect(res.headers['content-language']).toBe('en');
    });
});
