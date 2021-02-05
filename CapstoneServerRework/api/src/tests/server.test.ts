import { server, port } from '../server'

beforeEach((done) => {
    server.listen(port, done)
})

afterEach((done) => {
    server.close(done);
})

test('is port defined', () => {
    expect(port).not.toBeUndefined();
})

test('server is listening', () => {
    expect(server.listening).toBe(true);
})





