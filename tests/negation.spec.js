const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('decimal input and negate', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_cancel').click();
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_decimal').click();
    await page.locator('#btn_digit5').click();
    await expect(display).toHaveText('1.5');
    await page.locator('#btn_negate').click();
    await expect(display).toHaveText('-1.5');
});

test('double negate returns to positive', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_negate').click();
    await page.locator('#btn_negate').click();
    await expect(display).toHaveText('5');
});

test('negate has no effect in initial state', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_negate').click();
    await expect(display).toHaveText('0');
});

test('negate has no effect after operator', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_negate').click();
    await expect(display).toHaveText('5');
});

test('negate after equals negates the result', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_negate').click();
    await expect(display).toHaveText('-8');
});
