import { test, expect, request } from '@playwright/test';

const loginPayload = { userEmail: "henkalltd@gmail.com", userPassword: "Password1!" };
const orderPayload = { 
    orders: [
        { country: "Nigeria", productOrderedId: "6581cade9fd99c85e8ee7ff5" },
        { country: "Nigeria", productOrderedId: "6581ca399fd99c85e8ee7f45" },
        { country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}
    ] 
};
let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();

    // Login API request
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log('Token:', token);

    // Ensure the token is not empty
    if (!token) {
        throw new Error("Token is missing after login");
    }

    // Order creation API request
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,
        headers: {
            'Authorization' :token,
            'Content-Type': 'application/json'
        }
    });

    // Log the full response for debugging
    console.log('Order Response Status:', orderResponse.status());
    console.log('Order Response Headers:', orderResponse.headers());
    const orderResponseBody = await orderResponse.text();
    console.log('Order Response Body:', orderResponseBody);

    // Check if the order creation was successful
    if (!orderResponse.ok()) {
        throw new Error(`Order creation failed with status ${orderResponse.status()}`);
    }

    const orderResponseJson = JSON.parse(orderResponseBody);
    console.log('Order Response JSON:', orderResponseJson);

    // Check if the response contains the expected data
    if (orderResponseJson.orders && orderResponseJson.orders.length > 0) {
        orderId = orderResponseJson.orders[0];
        console.log('Order ID:', orderId);
    } else {
        throw new Error("Order creation failed, response does not contain an order ID");
    }
});

test('Web API Login and Place-Order', async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();

    // Add the token to localStorage before any page is opened
    await context.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    // Create a new page in the context
    const page = await context.newPage();

    // Navigate to the client page
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    // Navigate to the orders page
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    // Search for the created order in the orders table
    let orderFound = false;
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            orderFound = true;
            break;
        }
    }

    // Assert that the order was found
    if (!orderFound) {
        throw new Error(`Order ID ${orderId} not found in the orders table`);
    }

    // Validate the order details
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
