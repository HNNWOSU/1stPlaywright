// Import the necessary modules for Playwright testing
import { test, expect } from '@playwright/test';

// Define a test case with the name 'Browser Context Playwright Test' to be executed
test('Browser Context Playwright Test', async ({ browser }) => {

  // Create a new browser context
  const context = await browser.newContext();
  // Create a new page within the context
  const page = await context.newPage();

  // Define locators for various elements on the page
  const userName = page.locator("#username"); // Input field for username
  const password = page.locator("[type='password']"); // Input field for password
  const submit = page.locator("#signInBtn"); // Submit button for the login form
  const cardTitles = page.locator(".card-body a"); // Links to different products on the page

  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title()); // Print the title of the page

  // Fill in the username and password fields
  await userName.fill("rahulshetty");
  await password.fill("learning");

  // Click the submit button
  await submit.click();

  // Print the text content of the element with a style attribute containing the word 'block'
  console.log(await page.locator("[style*='block']").textContent());

  // Expect the text content of the above element to contain the word 'Incorrect'
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  // Clear the username field and fill it with a different value
  await userName.fill("");
  await userName.fill("rahulshettyacademy");

  // Click the submit button again
  await submit.click();

  // Print the text content of the first link in the cardTitles locator
  console.log(await cardTitles.nth(0).textContent());

  // Expect the cardTitles locator to contain the text 'iphone X'
  await expect(cardTitles).toContainText(['iphone X']);

  // Print the text content of the second link in the cardTitles locator
  console.log(await cardTitles.nth(1).textContent());

  // Expect the cardTitles locator to contain the text 'Samsung Note 8'
  await expect(cardTitles).toContainText(['Samsung Note 8']);

  // Get all the text content of the links in the cardTitles locator
  const allTitles = await cardTitles.allTextContents();

  // Print all the titles
  console.log(allTitles);
});

// Define another test case with the name 'Page Playwright Test' to be executed
test('Page Playwright Test', async ({ page }) => {

  // Navigate to Google's homepage
  await page.goto("https://google.com");

  // Print the title of the page
  console.log(await page.title());

  // Expect the title of the page to be 'Google'
  await expect(page).toHaveTitle("Google");
});


// Define a test case with the name 'Browser Context Playwright Test' to be executed
test('1st Assignment - Browser Context Playwright Test', async ({ browser }) => {

  // Create a new browser context
  const context = await browser.newContext();
  // Create a new page within the context
  const page = await context.newPage();

  // Define locators for various elements on the page
  const userEmail = page.locator("#userEmail"); // Input field for userEmail
  const userPassword = page.locator("#userPassword"); // Input field for userPassword
  const submit = page.locator("#login"); // Submit button for the login form
  const cardTitles = page.locator(".card-body b"); // Links to different products on the page

  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title()); // Print the title of the page

  // Fill in the userEmail and password fields
  await userEmail.fill("henkalltd@gmail.com");
  await userPassword.fill("Password1!");

  // Click the submit button
  await submit.click();


  // Print the text content of the first link in the cardTitles locator
  console.log(await cardTitles.nth(0).textContent());

  // Expect the cardTitles locator to contain the text 'iphone X'
  //await expect(cardTitles).toContainText(['iphone X']);

  // Print the text content of the second link in the cardTitles locator
  //console.log(await cardTitles.nth(1).textContent());

  // Expect the cardTitles locator to contain the text 'Samsung Note 8'
  //await expect(cardTitles).toContainText(['Samsung Note 8']);

  // Get all the text content of the links in the cardTitles locator
  const allTitles = await cardTitles.allTextContents();

  // Print all the titles
 console.log(allTitles);
});
