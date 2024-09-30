import { test, expect } from '@playwright/test';

test('Date Picker Functionality', async ({ page }) => {
    // Define the expected date values
    const expectedDate = {
        day: '15',
        month: '06', // June
        year: '2027'
    };

    // Navigate to the page with the date picker
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    // Open the date picker
    await page.locator('.react-date-picker__inputGroup').click();

    // Navigate to the correct year
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(expectedDate.year).click();

    // Navigate to the correct month
    await page.locator('.react-calendar__year-view__months__month').nth(Number(expectedDate.month) - 1).click();

    // Select the correct day
    await page.locator(`//abbr[text()='${expectedDate.day}']`).click();

    // Retrieve the values from the date picker input fields
    const inputs = page.locator('.react-date-picker__inputGroup input');

    // Use inputValue() method to get the full date value
    const fullDate = await inputs.nth(0).inputValue(); 

    // Split the date into its components
    const [year, month, day] = fullDate.split('-');

    // Log the values for debugging
    console.log('Selected Date:', { day, month, year });

    // Assert that the selected date matches the expected date
    expect(day).toBe(expectedDate.day);
    expect(month).toBe(expectedDate.month);
    expect(year).toBe(expectedDate.year);
});

