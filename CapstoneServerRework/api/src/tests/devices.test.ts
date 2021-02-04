const request = require('supertest');
import { app } from "../app";
import { createDbConnection } from "../controllers/db/createdbconnection"
import { database, dbURI, dbOptions } from "../models/mongoclient"

const testApp = request.agent(app)

const testDevice = {
    name: "test",
    id: "00",
    last_active: "now"
}

beforeAll((done) => {
    createDbConnection(database, dbURI, dbOptions);
    done();
});

afterAll((done) => {
    database.connection.close();
    done();
})

test('can create a device', async () => {
    const postRes = await testApp.post('/devices').send(testDevice);
    expect(postRes.status).toBe(200);
});

test('can get all devices', async done => {
    const getRes = await testApp.get('/devices');
    expect(getRes.status).toBe(200);
    done();
});

test('can delete a device', async () => {
    const deleteRes = await testApp.delete('/devices').send(testDevice);
    expect(deleteRes.status).toBe(200);
})
