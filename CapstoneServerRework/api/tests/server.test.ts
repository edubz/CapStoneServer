import { express, app, port, startServer } from "../index"

test('express is installed', () => {
    expect(express).not.toThrowError();
})

test('port is defined', () => {
    expect(port).toBeDefined();
})

test('port is 5000', () => {
    expect(port).toBe(5000);
})

test('server started', async () => {
    expect(startServer(5000).okMessage).toBe('server is listening on port:5000')
})