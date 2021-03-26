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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest');
const path_1 = __importDefault(require("path"));
const app_1 = require("../app");
const mongoclient_1 = require("../models/mongoclient");
const testApp = request.agent(app_1.app);
const testFilePath = path_1.default.join(__dirname, "/", "testsound.wav");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoclient_1.database.connect(mongoclient_1.dbURI, mongoclient_1.dbOptions);
}));
afterAll((done) => {
    mongoclient_1.database.connection.close();
    done();
});
test('can upload file', () => __awaiter(void 0, void 0, void 0, function* () {
    const postRes = yield testApp.post("/gallery").attach('gallery_file', testFilePath);
    expect(postRes.status).toBe(302);
}));
test('can retreive all files', () => __awaiter(void 0, void 0, void 0, function* () {
    const getRes = yield testApp.get("/gallery/data");
    expect(getRes.body).not.toBe([]);
}));
test('can delete files', () => __awaiter(void 0, void 0, void 0, function* () {
    const testFileName = "testsound.wav";
    const deleteRes = yield testApp.delete("/gallery").query({ name: "testsound.wav" });
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.text).toBe(`file: ${testFileName} deleted`);
}));
