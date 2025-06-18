import puppeteer from 'puppeteer';

describe('Inn Form', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('Form should render on page start', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForTimeout('.btn');
  });

  test('test popover', async () => {
    await page.waitForSelector('body');
    jest.setTimeout(20000);
    await page.goto('http://localhost:9000');

    await page.waitForTimeout('.btn');

    const btn = await page.$('.btn');

    await btn.click();

    await page.waitForTimeout('.popover');

    afterEach(async () => {
      await browser.close();
    });
  });
});
