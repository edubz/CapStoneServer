export const handleDbConnection = (client: any, err: Error) => {
    if (err) console.log(`Error at db connect: ${err}`);
    console.log("connected to database");
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
}
