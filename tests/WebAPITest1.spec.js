import { test, expect, request } from '@playwright/test';
import  APiUtils  from './Utils/APiUtils';


const loginPayload = { userEmail: "henkalltd@gmail.com", userPassword: "Password1!" }; // Define the payload for the user login
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]}; // Define the payload for the order
let response; // Variable to store the response from the API


// Run this function before all tests are executed
test.beforeAll(async () => {
    // Create a new API context
    const apiContext = await request.newContext();
    
    // Create an instance of the API utility class
    const apiUtils = new APiUtils(apiContext, loginPayload);

    // Use the API utility class to create an order
    response = await apiUtils.createOrder(orderPayload);

});

// test.beforeEach( ()=>
// {


// });

// Define a test case with the name 'Web API Login Place Order'
test('Web API Login Place Order', async ({ browser },)=> {

    // Create a new API context
    const apiContext = await request.newContext(); // Define and initialize apiContext

    // Create an instance of the API utility class
    const apiUtils = new APiUtils(apiContext, loginPayload); // Use apiContext to create an instance of ApiUtils

    // Use the API utility class to create an order
    const orderId = await apiUtils.createOrder(orderPayload); // Use the apiUtils instance to create an order

    // Create a new browser context
    const context = await browser.newContext();

    // Add the token to localStorage before any page is opened
    await context.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    // Create a new page in the context
    const page = await context.newPage();
  
    // Navigate to the login page
    await page.goto("https://rahulshettyacademy.com/client");
   
    // Click the 'My Orders' button
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    
    // Wait for the orders table to be loaded
    await page.locator("tbody").waitFor();
    
    // Get all the rows in the orders table
    const rows = await page.locator("tbody tr");

    // Iterate through the rows in the orders table
    for (let i = 0; i < await rows.count(); ++i) {
        // Get the order ID from the row
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        
        // Check if the order ID matches the order ID returned from the API
        if (response.orderId.includes(rowOrderId)) {
            // Click the 'View' button for the order
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    
    // Get the order ID details from the page
    const orderIdDetails = await page.locator(".col-text").textContent();
    
    // Pause the test so that the page can be inspected
    await page.pause();
    
    // Assert that the order ID returned from the API is contained in the order ID details
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

