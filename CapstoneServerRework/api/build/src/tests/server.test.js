"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
beforeEach((done) => {
    server_1.server.listen(server_1.port, done);
});
afterEach((done) => {
    server_1.server.close(done);
});
test('is port defined', () => {
    expect(server_1.port).not.toBeUndefined();
});
test('server is listening', () => {
    expect(server_1.server.listening).toBe(true);
});
