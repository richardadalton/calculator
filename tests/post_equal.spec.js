const { test, expect } = require('@playwright/test');
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, '..', 'index.html');
    await page.goto('file://' + filePath);
});

test('after equals pressing a digit starts a fresh number', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_digit7').click();
    await expect(display).toHaveText('7');
});

test('after equals pressing an operator continues from the result', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('6');
});

test('cancel after equals resets to 0', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_cancel').click();
    await expect(display).toHaveText('0');
});

test('equal in initial state does nothing', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('0');
});

test('equal with no second operand does nothing', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('5');
});

test('pressing zero after equals starts a fresh zero', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_digit0').click();
    await expect(display).toHaveText('0');
});

test('pressing equals again repeats the last operation', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('11');
});

test('pressing equals repeatedly keeps repeating the last operation', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit5').click();
    await page.locator('#btn_add').click();
    await page.locator('#btn_digit3').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('14');
});

test('repeat equals works for subtraction', async ({ page }) => {
    const display = page.locator('#display');
    await page.locator('#btn_digit1').click();
    await page.locator('#btn_digit0').click();
    await page.locator('#btn_subtract').click();
    await page.locator('#btn_digit2').click();
    await page.locator('#btn_equal').click();
    await page.locator('#btn_equal').click();
    await expect(display).toHaveText('6');
});
