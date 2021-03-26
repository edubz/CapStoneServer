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
const request = require("supertest");
const app_1 = require("../app");
const express_1 = __importDefault(require("express"));
const server_1 = require("../server");
test('express is installed', () => {
    expect(express_1.default).not.toThrowError();
});
test('port is defined', () => {
    expect(server_1.port).toBeDefined();
});
test('port is 5000', () => {
    expect(server_1.port).toBe(5000);
});
test('app is running in test env', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield request(app_1.app)
            .get('/')
            .expect(200);
    }
    catch (err) {
        throw err;
    }
}));
