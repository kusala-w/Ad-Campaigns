const express = require('express');
const config = require('./config/default.json');
const app = express();
const host = config.server.host;
const port = config.server.port;

app.use('/api/businesses', require('./routes/api/businesses'))

const listener = app.listen(port, host, (error) => {
    if(error) {
        console.log(error);
        process.exit(1);
    }

    console.log(`API listening on ${host}:${listener.address().port}`);
});