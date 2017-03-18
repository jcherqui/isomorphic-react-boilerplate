import assert from 'assert';
import express from 'express';
import path from 'path';

let listeningServer;
let browser;

global.assert = assert;
global.browser = browser;

before(() => {
    const server = express();
    server.use('/', express.static(path.join(__dirname, '../dist')));
    listeningServer = server.listen(8081);
});

after(() => listeningServer.close());
