const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('simple addition 1 + 2 = 3', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('3');
});

test('second + click evaluates addition', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_add').click();
    await expect(display).toHaveText('3');
});

test('multiple additions', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('6');
});

test('add a negated number causes subtraction', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_negate').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('3');
});
