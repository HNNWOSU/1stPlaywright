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
test('UI Controls', async ({ page }) => 
  {

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const submit = page.locator("#signInBtn");
  const documentLink = page.locator("a[href*='documents-request']");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator('label:nth-child(2) > .checkmark').click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect (page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect (await page.locator("#terms").isChecked()).toBeFalsy();
  await expect (documentLink).toHaveAttribute("class","blinkingText");
  //assertion
  //await page.pause();


});



test('Child Windows Handling', async ({ browser }) =>
  {
     // Create a new browser context
  const context = await browser.newContext();
  // Create a new page within the context
  const page = await context.newPage();
  const userName = page.locator("#username"); 

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([

      context.waitForEvent('page'),
      documentLink.click(),
    ])

   const pageText = await newPage.locator(".red").textContent();
   const arrayText = pageText.split("@")
   const domain = arrayText[1].split(" ") [0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    //await page.pause();
    console.log(await page.locator("#username").textContent());
    
    
})
