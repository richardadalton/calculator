const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('simple division 8 / 2 = 4', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit8').click();
    await page.locator('#btn_divide').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('4');
});

test('division producing a decimal result', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit7').click();
    await page.locator('#btn_divide').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('3.5');
});

test('second / click evaluates division', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit8').click();
    await page.locator('#btn_divide').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_divide').click();
    await expect(display).toHaveText('4');
});

test('multiple divisions', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_divide').click();
    await page.locator('#btn_digit4').click();
    await page.locator('#btn_divide').click();
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('5');
});
