
import { Db, GridFSBucket } from "mongodb";
import { dbIsConnected } from "../../models/mongoclient";

const handleDbConnect = (db: any) => {
    console.log("db is connected");
}

const handleDbError = (err: Error) => console.log(err);

export { handleDbConnect, handleDbError };