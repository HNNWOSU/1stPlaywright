import { test, expect, request } from '@playwright/test';
import APiUtils from './Utils/APiUtils';

const loginPayload = { userEmail: "henkalltd@gmail.com", userPassword: "Password1!" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Web API Login Place Order', async ({ browser }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    const orderId = await apiUtils.createOrder(orderPayload);

    const context = await browser.newContext();
    await context.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    // Network Intercept
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async (route) => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill({
            response,
            body,
        });
    });

    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    //await page.pause();
    await page.waitForResponse ("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    await page.getByText("You have No Orders to show at this time.Please Visit Back Us.").isVisible();
    console.log(await page.locator(".mt-4").textContent());
    

    // ... rest of your test logic ...
});
