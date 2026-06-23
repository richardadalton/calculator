const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('simple cancel sets display to 0', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_cancel').click();
    await expect(display).toHaveText('0');
});

test('cancel after operator resets to 0', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_cancel').click();
    await expect(display).toHaveText('0');
});

test('cancel resets so next digit starts fresh', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit9').click();
    await page.locator('#btn_cancel').click();
    await page.locator('#btn_digit3').click();
    await expect(display).toHaveText('3');
});

test('cancel in initial state keeps display at 0', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_cancel').click();
    await expect(display).toHaveText('0');
});
