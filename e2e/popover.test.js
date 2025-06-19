import puppeteer from 'puppeteer';

jest.setTimeout(20000);

describe('Inn Form', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
  });

  test('Form should render on page start', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForTimeout('.btn');
  });

  test('test popover', async () => {
    await page.waitForSelector('body');
    await page.goto('http://localhost:9000');
    await page.waitForSelector('.btn');

    const btn = await page.$('.btn');

    await btn.click();

    await page.waitForSelector('.popover');
  });

  afterEach(async () => {
    await browser.close();
  });
});
