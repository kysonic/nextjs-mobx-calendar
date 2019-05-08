const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.screenshot({path: path.join(__dirname, '__screenshots__', 'index.png')});

    await browser.close();
})();
