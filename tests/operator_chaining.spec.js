const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('changing operator before entering second number', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_subtract').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('2');
});

test('mixed operators are evaluated left to right', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_multiply').click();
    await page.locator('#btn_digit4').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('20');
});

test('operator press shows intermediate result', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_multiply').click();
    await expect(display).toHaveText('5');
});

test('long chain of additions', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit4').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('10');
});

test('operator button has no effect before any number is entered', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_add').click();
    await expect(display).toHaveText('0');
});
