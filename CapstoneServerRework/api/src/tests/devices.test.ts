const request = require('supertest');
import { app } from "../app";
import { server } from "../server";

const testApp = request.agent(app)

test('devices get route is available', async done => {
    const res = await testApp.get('/devices');
    expect(res.status).toBe(200);
    done();
})