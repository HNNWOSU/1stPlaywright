import { test, expect } from '@playwright/test';

test('ParaBankRegister', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer\\.firstName"]').click();
  await page.locator('[id="customer\\.firstName"]').click();
  await page.locator('[id="customer\\.firstName"]').fill('Test 1');
  await page.locator('[id="customer\\.lastName"]').click();
  await page.locator('[id="customer\\.lastName"]').fill('Test 2');
  await page.locator('[id="customer\\.address\\.street"]').click();
  await page.locator('[id="customer\\.address\\.street"]').fill('1st Line');
  await page.locator('[id="customer\\.address\\.city"]').click();
  await page.locator('[id="customer\\.address\\.city"]').fill('2nd Line');
  await page.locator('[id="customer\\.address\\.state"]').click();
  await page.locator('[id="customer\\.address\\.state"]').fill('Texas');
  await page.locator('[id="customer\\.address\\.zipCode"]').click();
  await page.locator('[id="customer\\.address\\.zipCode"]').fill('74974');
  await page.locator('[id="customer\\.phoneNumber"]').click();
  await page.locator('[id="customer\\.phoneNumber"]').fill('187634657');
  await page.locator('[id="customer\\.ssn"]').click();
  await page.locator('[id="customer\\.ssn"]').fill('0987654321');
  await page.locator('[id="customer\\.username"]').click();
  await page.locator('[id="customer\\.username"]').fill('hnqatest');
  await page.getByRole('row', { name: 'Password:' }).getByRole('cell').nth(1).click();
  await page.locator('[id="customer\\.password"]').fill('Password1!');
  await page.locator('#repeatedPassword').click();
  await page.locator('#repeatedPassword').fill('Password1!');
  await page.getByRole('button', { name: 'Register' }).click();
});

test('ParaBANKTest', async ({ page }) => {


    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill('hnqatest');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('Password1!');
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByRole('link', { name: 'Transfer Funds' })).toBeVisible();
    await page.getByRole('link', { name: 'Transfer Funds' }).click();
    await page.locator('#amount').click();
    await page.locator('#amount').fill('100');
    await expect(page.getByRole('button', { name: 'Transfer' })).toBeVisible();
    await page.getByRole('button', { name: 'Transfer' }).click();
    await page.locator('#headerPanel').getByRole('link', { name: 'Services' }).click();
    await page.getByRole('row', { name: 'Bookstore Parasoft Bookstore' }).getByRole('link').click();
    await page.goto('https://parabank.parasoft.com/parabank/services.htm');
    await page.getByRole('row', { name: 'Bookstore (Version 2.0)' }).getByRole('link').click();
    await page.goto('https://parabank.parasoft.com/parabank/services.htm');
    console.log(await page.title());
    await expect(page.getByRole('link', { name: 'Request Loan' })).toBeVisible();
    await page.getByRole('link', { name: 'Request Loan' }).click();
    await page.getByRole('link', { name: 'Log Out' }).click();
  });