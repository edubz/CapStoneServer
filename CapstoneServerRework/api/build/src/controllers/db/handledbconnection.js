"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDbError = exports.handleDbConnect = void 0;
const handleDbConnect = (db) => {
    console.log("db is connected");
};
exports.handleDbConnect = handleDbConnect;
const handleDbError = (err) => console.log(err);
exports.handleDbError = handleDbError;
