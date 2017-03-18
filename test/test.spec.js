import assert from 'assert';
import express from 'express';
import path from 'path';

const webdriverio = require('webdriverio');

describe('my tests', function () {
    this.timeout(99999999);
    let client;

    before(() => {
        const server = express();
        server.use('/', express.static(path.join(__dirname, '../dist')));
        server.listen(8081);

        client = webdriverio.remote({ desiredCapabilities: { browserName: 'phantomjs' } });
        return client.init();
    });

    it('Homepage', () => {
        return client
            .url('http://0.0.0.0:8081')
            .getText('.hello')
            .then(text => assert(text === 'Hello world!'))
            .getTitle()
            .then(title => assert(title === 'Boilerplate'));
    });

    after(() => client.end());
});
