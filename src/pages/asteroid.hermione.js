const { assert } = require('chai');

describe('Header on asteroid page', () => {
    it('should be displayed correctly', function () {
        this.browser
            .url('/asteroid?id=3542519')
            .assertView('headerAsteroid', '.Header');
    });
});

describe('Options', () => {
    it('should be displayed correctly', function () {
        this.browser
            .url('/asteroid?id=3542519')
            .assertView('optionsAsteroid', '.Options');
    });
});

describe('Asteroid full card', () => {
    it('should add asteroid to destruction list', async function () {
        const { browser } = this;

        const exists = await browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Card:first-child .Card-Title')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/asteroid', 1500)
            .click('.Card-Result button')
            .click('.Header-Links .Links-Item:last-child')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/destruction-list', 1500)
            .isExisting('.Card');

        assert.ok(exists, 'There are no asteroids in destruction list');
    });

    it('should render distance in kilometers', async function () {
        const { browser } = this;

        const textArr = await browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Card:first-child .Card-Title')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/asteroid', 1500)
            .getText('.Card-Full .Card-Item:nth-child(3) div:last-child');

        assert.ok(textArr.every(text => text.includes('км')));
    });

    it('should render distance in lunar distances after options select', async function () {
        const { browser } = this;

        const textArr = await browser
            .url('/')
            .click('.Options-Links .Links-Item:last-child')
            .waitForExist('.Card', 1500)
            .click('.Card:first-child .Card-Title')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/asteroid', 1500)
            .getText('.Card-Full .Card-Item:nth-child(3) div:last-child');

        assert.ok(textArr.every(text => text.includes('LD')));
    });

    it('should show "Await destruction" message', async function () {
        const { browser } = this;

        const exists = await browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Card:first-child .Card-Result button')
            .click('.Card:first-child .Card-Title')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/asteroid', 1500)
            .isExisting('.Card-AwaitDestruction');

        assert.ok(exists, 'There are no "Await destruction" message');
    });
});