const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('simple subtraction 5 - 3 = 2', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_subtract').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('2');
});

test('subtracting larger from smaller gives negative', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_subtract').click();
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('-2');
});

test('second - click evaluates subtraction', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_subtract').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_subtract').click();
    await expect(display).toHaveText('2');
});

test('multiple subtractions', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_subtract').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_subtract').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('5');
});
