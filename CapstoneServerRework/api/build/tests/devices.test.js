"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest');
const app_1 = require("../app");
const createdbconnection_1 = require("../controllers/db/createdbconnection");
const mongoclient_1 = require("../models/mongoclient");
const testApp = request.agent(app_1.app);
const testDevice = {
    name: "test",
    id: "00",
    last_active: "now"
};
beforeAll((done) => {
    createdbconnection_1.createDbConnection(mongoclient_1.database, mongoclient_1.dbURI, mongoclient_1.dbOptions);
    done();
});
afterAll((done) => {
    mongoclient_1.database.connection.close();
    done();
});
test('can create a device', () => __awaiter(void 0, void 0, void 0, function* () {
    const postRes = yield testApp.post('/devices').send(testDevice);
    expect(postRes.status).toBe(200);
}));
test('can get all devices', (done) => __awaiter(void 0, void 0, void 0, function* () {
    const getRes = yield testApp.get('/devices');
    expect(getRes.status).toBe(200);
    done();
}));
test('can delete a device', () => __awaiter(void 0, void 0, void 0, function* () {
    const deleteRes = yield testApp.delete('/devices').send(testDevice);
    expect(deleteRes.status).toBe(200);
}));
