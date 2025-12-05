const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('decimal input and negate', async ({ page }) => {
    const display = page.locator('#display');
    // clear
    await page.locator('#btn_cancel').click();
    // enter 1.5
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_decimal').click();
    await page.locator('#btn_digit5').click();
    await expect(display).toHaveText('1.5');
    // negate
    await page.locator('#btn_negate').click();
    await expect(display).toHaveText('-1.5');
});
