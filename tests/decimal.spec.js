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

test('Can append decimal immediately after 0', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_decimal').click();
    await expect(display).toHaveText('0.');
});

test('Can append decimal immediately after applying an operator', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_decimal').click();
    await expect(display).toHaveText('0.');
});

test('second decimal press is ignored', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_decimal').click();
    await page.locator('#btn_decimal').click();
    await page.locator('#btn_digit5').click();
    await expect(display).toHaveText('1.5');
});

test('second decimal press is ignored in second operand', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_decimal').click();
    await page.locator('#btn_decimal').click();
    await page.locator('#btn_digit5').click();
    await expect(display).toHaveText('1.5');
});

test('decimal arithmetic: 5 + 1.5 = 6.5', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_decimal').click();
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('6.5');
});
