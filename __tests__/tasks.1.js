const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
}
let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("Markup", () => {
    it("`index.html` should contain appropriate meta tags", async () => {
        try {
            const metaTags = await page.$$('meta');
            expect(metaTags.length).toBeGreaterThan(1);
        } catch (err) {
            throw err;
        }
    });
    it("`index.html` Should contain a title tag that is not empty", async () => {
        try {
            const title = await page.$eval('title', el => el.innerHTML);
            expect(title).not.toBe('');
        } catch (err) {
            throw err;
        }
    });
    it("Nav element Should be present on the page", async () => {
        try {
            const nav = await page.$('nav');
            expect(nav).toBeTruthy();
        } catch (err) {
            throw err;
        }
    });
});

describe("Fonts", () => {
    it("Page Should contain 'Maven Pro' Google font", async () => {
        try {
            const link = await page.$eval('link[rel="preconnect"]', el => el.href);
            expect(link).toContain('https://fonts.googleapis.com/');
        } catch (err) {
            throw err;
        }
    });
})

describe("Styling", () => {
    it("Grid Layout should be used", async () => {
        try {
            const grid = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('display')));
            expect(grid).toContain('grid');
            } catch (err) {
            throw err;
            }
    });
    it("Grid Template Columns CSS property Should be used", async () => {
       try {
            const gridTemplateCol = await page.$$eval('*', el => Array.from(el).filter(e => getComputedStyle(e).getPropertyValue('grid-template-columns') !== 'none'));
            expect(gridTemplateCol.length).toBeGreaterThan(0)
       } catch (error) {
            throw error;       
       }
    });
    it("Grid Template Rows CSS property Should be used", async () => {
        try {
            const gridTemplateRow = await page.$$eval('*', el => Array.from(el).filter(e => getComputedStyle(e).getPropertyValue('grid-template-rows') !== 'none'));
            expect(gridTemplateRow.length).toBeGreaterThan(0)
        } catch (error) {
             throw error;       
        }
     });
     it("Grid Column CSS property Should be used", async () => {
        try {
            const gridCol = await page.$$eval('*', el => Array.from(el).filter(e => getComputedStyle(e).getPropertyValue('grid-column') !== 'auto / auto'));
            expect(gridCol.length).toBeGreaterThan(0)
        } catch (error) {
             throw error;       
        }
     });
})