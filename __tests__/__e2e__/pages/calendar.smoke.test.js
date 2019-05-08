const puppeteer = require('puppeteer');
const path = require('path');

let browser, page;

describe('Calendar page smoke', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/calendar');
    });

    test('Correct title', async () => {
        await expect(page.title()).resolves.toMatch('Calendar');
    });

    test('Calendar is on the page ', async () => {
        const calendar = await page.$('div.calendar');
        expect(calendar).toBeTruthy();
    });

    test('Test month switcher', async () => {
        const monthSwitcher = await page.$('div.month-switcher');
        expect(monthSwitcher).toBeTruthy();
        await page.click('*[data-testid="arrow-right"]');
        let month = await page.evaluate(() => document.querySelector('*[data-testid="month"]').textContent);
        expect(month).toBe('June');
        await page.screenshot({path: path.join(__dirname, '__screenshots__', 'calendar_june.png')});
        await page.click('*[data-testid="arrow-left"]');
        month = await page.evaluate(() => document.querySelector('*[data-testid="month"]').textContent);
        expect(month).toBe('May');
        await page.screenshot({path: path.join(__dirname, '__screenshots__', 'calendar_may.png')});
    });

    test('Screenshot', async () => {
        await page.screenshot({path: path.join(__dirname, '__screenshots__', 'calendar.png')});
    });
});
