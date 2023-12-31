import request from 'supertest';

import { app } from '../Server/server';

// UNIT TESTS: Server side handling
describe('Server, APIs, and Middleware Tests', () => {
    test('OS API', async () => {
        const res = await request(app).get('/client/os/system/api/ping');
        expect(res.body).toEqual({ message: 'Pong!' });
    });

    test('Auto Language Detection (no lang code in URL)', async () => {
        const res: request.Response = await request(app).get('/');
        expect(res.status).toBe(302);
    });

    test('Auto Language Detection (lang code in URL)', async () => {
        const res: request.Response = await request(app).get('/en');
        expect(res.status).toBe(200);
    });
});
