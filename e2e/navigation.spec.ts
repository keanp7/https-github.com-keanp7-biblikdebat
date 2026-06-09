import { test, expect } from '@playwright/test';

test.describe('Navigation Clicks', () => {
  test('Clicking through the app works without errors', async ({ page }) => {
    // Listen for unhandled errors
    const errors: string[] = [];
    page.on('pageerror', exception => {
      errors.push(exception.message);
    });

    // Go to the homepage in english
    await page.goto('/en');

    // Click on Sign In
    await page.locator('nav').getByRole('link', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/en\/auth\/login/);
    
    // Click on Sign Up from Login page
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveURL(/\/en\/auth\/signup/);

    // Go back to home
    await page.goto('/en');

    // Click on Admin
    await page.locator('nav').getByRole('link', { name: 'Admin' }).click();
    // It should redirect to login since not logged in!
    await expect(page).toHaveURL(/\/en\/auth\/login/);

    // Go back
    await page.goto('/en');

    // Click Join the Community on Landing Page
    await page.getByRole('link', { name: 'Join the Community' }).click();
    await expect(page).toHaveURL(/\/en\/auth\/signup/);

    // Go back
    await page.goto('/en');

    // Click on Communities
    await page.locator('nav').getByRole('link', { name: 'Communities' }).click();
    await expect(page).toHaveURL(/\/en\/groups/);

    // Ensure no client side errors occurred
    expect(errors).toEqual([]);
  });
});
