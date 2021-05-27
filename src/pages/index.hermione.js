const { assert } = require('chai');

describe('Header on index page', () => {
    it('should be displayed correctly', function () {
        this.browser
            .url('/')
            .assertView('headerIndex', '.Header');
    });
});

describe('Header link', () => {
    it('should go to destruction list', async function () {
        const { browser } = this;

        const url = await browser
            .url('/')
            .click('.Header-Links .Links-Item:last-child')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/destruction-list')
            .getUrl();

        assert.equal(new URL(url).pathname, '/destruction-list');
    });
});

describe('Options', () => {
    it('should be displayed correctly on default', function () {
        this.browser
            .url('/')
            .assertView('optionsDefault', '.Options');
    });

    it('should be displayed correctly on filter click', function () {
        this.browser
            .url('/')
            .click('.Options-Filter')
            .assertView('optionsHazardous', '.Options');
    });

    it('should be displayed correctly on link click', function () {
        this.browser
            .url('/')
            .click('.Options-Links .Links-Item:last-child')
            .assertView('optionsLunar', '.Options-Links');
    });
});

describe('Asteroid short card', () => {
    it('should render current date', async function () {
        const textArr = await this.browser
            .url('/')
            .waitForExist('.Card', 1500)
            .getText('.Card .Card-Item:first-child div:last-child');

        assert.ok(textArr.every(text => text === new Date().toLocaleString('ru', {
            dateStyle: 'long',
        })), 'At least one card without current date');
    });

    it('should render distance in kilometers', async function () {
        const textArr = await this.browser
            .url('/')
            .waitForExist('.Card', 1500)
            .getText('.Card .Card-Item:nth-child(2) div:last-child');

        assert.ok(textArr.every(text => text.includes('км')));
    });

    it('should render distance in lunar distances after options select', async function () {
        const textArr = await this.browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Options-Links .Links-Item:last-child')
            .getText('.Card .Card-Item:nth-child(2) div:last-child');

            assert.ok(textArr.every(text => text.includes('LD')));
    });

    it('should render non-hazardous asteroids', async function () {
        const exists = await this.browser
            .url('/')
            .waitForExist('.Card', 1500)
            .isExisting('.Card-Background:not(.Card-Background_hazardous)');

        assert.ok(exists, 'There are no non-hazardous asteroids in list');
    });

    it('should not render non-hazardous asteroids after filter click', async function () {
        const exists = await this.browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Options-Filter')
            .isExisting('.Card-Background:not(.Card-Background_hazardous)');

        assert.ok(!exists, 'There are at least one non-hazardous asteroid in list');
    });
});

describe('Card title link', () => {
    it('should go to asteroid page', async function () {
        const { browser } = this;

        const url = await browser
            .url('/')
            .waitForExist('.Card', 1500)
            .click('.Card:first-child .Card-Title')
            .waitUntil(async () => new URL(await browser.getUrl()).pathname === '/asteroid', 1500)
            .getUrl();

        assert.equal(new URL(url).pathname, '/asteroid');
    });
});
