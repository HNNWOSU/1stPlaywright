// Import the necessary modules for Playwright testing
import { test, expect } from '@playwright/test';

// Define a test case with the name 'Web Client App login' to be executed
test ('@Web Client App login', async ({ page }) => {
  
  // Define variables for email, product name, and products locator
  const email = "henkalltd@gmail.com"; // Email to be used for login
  const productName = 'zara coat 3'; // Name of a product
  const products = page.locator(".card-body"); // Locator for all products on the page

  // Navigate to the website
  await page.goto("https://rahulshettyacademy.com/client");
  
  // Fill in the email field
  await page.locator("#userEmail").fill(email);
  
  // Fill in the password field
  await page.locator("#userPassword").fill("Password1!");
  
  // Click the login button
  await page.locator("[value='Login']").click();
  
  // Wait for the page to finish loading all network requests
  await page.waitForLoadState('networkidle');
  
  // Wait for the first product title to be loaded
  await page.locator(".card-body b").first().waitFor();
  
  // Get all the text content of the product titles
  const titles = await page.locator(".card-body b").allTextContents();
  
  // Print the product titles
  console.log(titles); 
  
  // End of the test case
})
