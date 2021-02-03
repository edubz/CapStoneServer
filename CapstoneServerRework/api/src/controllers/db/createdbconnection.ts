import { handleDbConnect, handleDbError } from "./handledbconnection";

export function createDbConnection(db: any, dbURI: string, dbOptions: Object) {
    db.connect(dbURI, dbOptions).then(handleDbConnect).catch(handleDbError);
}