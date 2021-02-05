const request = require('supertest');
import path from "path";
import { app } from "../app";
import { database, dbURI, dbOptions } from "../models/mongoclient"

const testApp = request.agent(app)
const testFilePath = path.join(__dirname, "/", "testsound.wav")

beforeAll(async () => {
    await database.connect(dbURI, dbOptions);
});

afterAll((done) => {
    database.connection.close();
    done();
});

test('can upload file', async () => {
    const postRes = await testApp.post("/gallery").attach('gallery_file', testFilePath);
    expect(postRes.status).toBe(302);
})

test('can retreive all files', async () => {
    const getRes = await testApp.get("/gallery/data");
    expect(getRes.body).not.toBe([]);
})

test('can delete files', async () => {
    const testFileName = "testsound.wav"
    const deleteRes = await testApp.delete("/gallery").query({ name: "testsound.wav" });
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.text).toBe(`file: ${testFileName} deleted`)
})