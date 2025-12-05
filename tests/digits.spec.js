const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('initial display is 0', async ({ page }) => {
    const display = page.locator('#display');
    await expect(display).toHaveText('0');
});

test('simple enter all digits', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_digit4').click();
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_digit6').click();
    await page.locator('#btn_digit7').click();
    await page.locator('#btn_digit8').click();
    await page.locator('#btn_digit9').click();
    await page.locator('#btn_digit0').click();
    await expect(display).toHaveText('1234567890');
});
