import assert from 'assert';
import express from 'express';
import path from 'path';
import * as webdriverio from 'webdriverio';

let listeningServer;

const options = {
    browserName: 'phantomjs',
    port: 8081,
};

before(() => {
    const server = express();
    server.use('/', express.static(path.join(__dirname, '../dist')));
    listeningServer = server.listen(options.port);

    const client = webdriverio.remote({ desiredCapabilities: { browserName: options.browserName } });

    global.browser = client.init();
    global.assert = assert;

    return browser;
});

after(() => {
    listeningServer.close();
    browser.end();
});
