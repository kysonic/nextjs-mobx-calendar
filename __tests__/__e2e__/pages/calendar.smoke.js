const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/calendar');
    await page.screenshot({path: path.join(__dirname, '__screenshots__', 'calendar.png')});

    await browser.close();
})();
