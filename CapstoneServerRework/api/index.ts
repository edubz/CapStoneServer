const express = require("express");
const app = express();
const port = 5000;
const startServer = (port: number) => {
    app.listen(port, () => {
        let okMessage = `Server is listening on port:${port}`;
        return okMessage;
    })
};

export { express, app, port, startServer };