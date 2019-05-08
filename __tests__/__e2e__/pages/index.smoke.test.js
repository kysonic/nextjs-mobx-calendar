const puppeteer = require('puppeteer');
const path = require('path');

let browser, page;

describe('Home page smoke', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    test('Correct title', async () => {
        await expect(page.title()).resolves.toMatch('Welcome!');
    });

    test('Correct text', async () => {
        const textContent = await page.evaluate(() => document.querySelector('*[data-testid="text"]').textContent);
        expect(textContent).toBe('Welcome to the Mobx Calendar');
    });

    test('Screenshot', async () => {
        await page.screenshot({path: path.join(__dirname, '__screenshots__', 'index.png')});
    });
});
