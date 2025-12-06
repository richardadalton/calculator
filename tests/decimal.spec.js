const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('Can append 0 immediately after a decimal place', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_decimal').click();
    await page.locator('#btn_digit0').click();
    await expect(display).toHaveText('0.0');
});
