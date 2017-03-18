describe('my tests', () => {
    before(() => {
        browser = require('webdriverio').remote({ desiredCapabilities: { browserName: 'phantomjs' } });
        return browser.init();
    });

    it('welcome', function* () {
        yield browser.url('http://0.0.0.0:8081');

        const title = yield browser.getTitle();
        assert.equal(title, 'Boilerplate');

        const text = yield browser.getText('.hello');
        assert.equal(text, 'Hello world!');
    });
});
