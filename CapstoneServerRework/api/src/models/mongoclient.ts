import database from "mongoose";
const dbURI = "mongodb+srv://capstoner:capstone2020@pcc-creative-coding-cap.3cnck.mongodb.net/pcc-capstone-2020-db?retryWrites=true&w=majority";

interface dbOptions {
    useNewUrlParse: Boolean,
    useUnifiedToposlogy: Boolean
}

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

let dbIsConnected = new Promise((resolve) => {
    if (database.connection.readyState == 1) resolve;
})
export { database, dbURI, dbOptions, dbIsConnected };