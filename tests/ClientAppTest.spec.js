// Import the necessary modules for Playwright testing
import { test, expect } from '@playwright/test';

// Define a test case with the name 'Browser Context Playwright Test' to be executed
test.only('1st Assignment - Browser Context Playwright Test', async ({ browser }) => {

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
