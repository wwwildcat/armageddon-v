const { assert } = require('chai');

describe('Header on destruction list page', () => {
    it('should be displayed correctly', function () {
        this.browser
            .url('/destruction-list')
            .assertView('headerDestructionList', '.Header');
    });
});

describe('Header link', () => {
    it('should go to main page', async function () {
        const { browser } = this;

        const url = await browser
            .url('/destruction-list')
            .click('.Header-Links .Links-Item:first-child')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/')
            .getUrl();

        assert.equal(new URL(url).pathname, '/');
    });
});

describe('Destruction list', () => {
    it('should be displayed correctly without items', function () {
        this.browser
            .url('/destruction-list')
            .assertView('destructionListEmpty', '.List');
    });

    it('should render distance in kilometers', async function () {
        const { browser } = this;

        const text = await browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Card-Result button')
            .click('.Header-Links .Links-Item:last-child')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/destruction-list', 1500)
            .getText('.Card .Card-Item:nth-child(2) div:last-child');

            assert.include(text, 'км');
    });

    it('should render distance in lunar distances after options select', async function () {
        const { browser } = this;

        const text = await browser
            .url('/')
            .click('.Options-Links .Links-Item:last-child')
            .waitForExist('.Card', 1500)
            .click('.Card-Result button')
            .click('.Header-Links .Links-Item:last-child')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/destruction-list', 1500)
            .getText('.Card .Card-Item:nth-child(2) div:last-child');

            assert.include(text, 'LD');
    });

    it('should render non-hazardous asteroids', async function () {
        const { browser } = this;
        const exists = await browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Card-Background:not(.Card-Background_hazardous) ~ .Card-Result button')
            .click('.Card-Background.Card-Background_hazardous ~ .Card-Result button')
            .click('.Header-Links .Links-Item:last-child')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/destruction-list', 1500)
            .isExisting('.Card-Background:not(.Card-Background_hazardous)');

        assert.ok(exists, 'There are no non-hazardous asteroids in list');
    });

    it('should not render non-hazardous asteroids after filter click', async function () {
        const { browser } = this;
        const exists = await browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Card-Background:not(.Card-Background_hazardous) ~ .Card-Result button')
            .click('.Card-Background.Card-Background_hazardous ~ .Card-Result button')
            .click('.Options-Filter')
            .click('.Header-Links .Links-Item:last-child')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/destruction-list', 1500)
            .isExisting('.Card-Background:not(.Card-Background_hazardous)');

        assert.ok(!exists, 'There are at least one non-hazardous asteroid in list');
    });
});
