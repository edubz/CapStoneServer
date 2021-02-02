const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://capstoner:capstone2020@pcc-creative-coding-cap.3cnck.mongodb.net/PCC-Creative-Coding-Capstone?retryWrites=true&w=majority";
export const database = new MongoClient(uri, { useUnifiedTopology: true });