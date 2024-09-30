import { test, expect } from '@playwright/test';

// Define a test case with the name 'Browser Context Playwright Test' to be executed
test('1st Assignment - Browser Context Playwright Test', async ({ browser }) => {

  // Create a new browser context and a new page within the context
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Define constants for the test
  const productName = "ZARA COAT 3";
  const email = "henkalltd@gmail.com";
  
  // Define locators for various elements on the page
  const userPassword = page.locator("#userPassword");
  const submit = page.locator("#login");
  const cardTitles = page.locator(".card-body b");
  const products = page.locator(".card-body");
  
  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  
  // Fill in the user email and password fields
  await page.locator("#userEmail").fill(email);
  await userPassword.fill("Password1!");
  
  // Click the submit button
  await submit.click();
  
  // Wait for the page to finish loading all network requests
  await page.waitForLoadState('networkidle');
  
  // Get all the text content of the links in the cardTitles locator and print them
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
  
  // Iterate over the products and add the specified product to the cart
  const productCount = await products.count();
  for (let i = 0; i < productCount; ++i) {
    if (await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }
  
  // Navigate to the cart and verify the product is present
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const productVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(productVisible).toBeTruthy();
  
  // Proceed to checkout
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  
  // Select the country from the dropdown
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  // Fill in credit card details
  await page.locator("input[value='4542 9931 9292 2293']").fill("4542 9931 9292 2293");
  await page.locator("select:nth-of-type(1)").selectOption({ index: 2 }); // Select 3rd option
  await page.locator("select:nth-of-type(2)").selectOption({ index: 26 }); // Select 27th option
  await page.locator("div:nth-of-type(2) > .input.txt").fill("132");
  await page.locator(".form__cc .row:nth-of-type(3) .input").fill("Henry Nwosu");

  // Apply coupon code and submit
  await page.locator("input[name='coupon']").fill("rahulshettyacademy");
  await page.locator(".btn.btn-primary.mt-1").click();

  // Verify the user email is correctly populated and place the order
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  
  // Print the order ID
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
  //await page.locator("tbody .ng-star-inserted:nth-of-type(4) [tabindex]").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");


  for (let i = 0; i < await rows.count(); ++i) {
     const rowOrderId = await rows.nth(i).locator("th").textContent();
     if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
     }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

});