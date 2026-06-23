const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('simple multiplication 3 * 4 = 12', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_multiply').click();
    await page.locator('#btn_digit4').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('12');
});

test('multiply by zero gives zero', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_multiply').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('0');
});

test('second * click evaluates multiplication', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_multiply').click();
    await page.locator('#btn_digit4').click();
    await page.locator('#btn_multiply').click();
    await expect(display).toHaveText('12');
});

test('multiple multiplications', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_multiply').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_multiply').click();
    await page.locator('#btn_digit4').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('24');
});
