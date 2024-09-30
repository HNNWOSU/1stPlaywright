import { test, expect, request } from '@playwright/test';
import  APiUtils  from './Utils/APiUtils';


const loginPayload = { userEmail: "henkalltd@gmail.com", userPassword: "Password1!" };
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]}
let response;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayload);

});

// test.beforeEach( ()=>
// {


// });

test('Web API Login Place Order', async ({ browser },)=> {

    const apiContext = await request.newContext(); // Define and initialize apiContext
    const apiUtils = new APiUtils(apiContext, loginPayload); // Use apiContext to create an instance of ApiUtils
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
   
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
