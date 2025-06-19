import puppeteer from 'puppeteer';

describe('Page start', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
  });

  test('test', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('body');
  });

  afterEach(async () => {
    await browser.close();
  });
});
