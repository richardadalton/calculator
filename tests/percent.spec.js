const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('Apply percent to number.', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_cancel').click();
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_percent').click();
    await expect(display).toHaveText('10%');
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('0.1');
});

test('percent has no effect in initial state', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_percent').click();
    await expect(display).toHaveText('0');
});

test('percent has no effect after an operator', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_percent').click();
    await expect(display).toHaveText('5');
});

test('second percent press is ignored', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_percent').click();
    await page.locator('#btn_percent').click();
    await expect(display).toHaveText('10%');
});

test('percent on second operand shows percent symbol', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_percent').click();
    await expect(display).toHaveText('10%');
});

test('100 + 25% = 125', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_percent').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('125');
});

test('percent on second operand is percentage of first operand', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_percent').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('55');
});

test('percent on second operand works with subtraction', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_subtract').click();
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_percent').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('45');
});
