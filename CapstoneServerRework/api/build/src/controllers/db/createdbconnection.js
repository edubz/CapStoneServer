"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbConnection = void 0;
const handledbconnection_1 = require("./handledbconnection");
function createDbConnection(db, dbURI, dbOptions) {
    db.connect(dbURI, dbOptions).then(handledbconnection_1.handleDbConnect(db.connection.db)).catch(handledbconnection_1.handleDbError);
}
exports.createDbConnection = createDbConnection;
