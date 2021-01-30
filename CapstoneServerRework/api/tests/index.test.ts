import { express, app, router, port } from "../index";
const request = require('supertest')

test('express is installed', () => {
    expect(express).not.toThrowError();
})

test('port is defined', () => {
    expect(port).toBeDefined();
})

test('port is 5000', () => {
    expect(port).toBe(5000);
})

test('router exists', async () => {
    const r = await router;
    expect(r).not.toBeUndefined();
    expect(r).not.toBeNull();
})

test('app is running in test env', async () => {
    try {
        await request(app)
            .get('/')
            .expect('OK')
    }
    catch (err) {
        throw err;
    }
});