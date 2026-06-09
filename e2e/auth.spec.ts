import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('Login page renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3005/en/auth/login');
    
    // Verify title
    await expect(page.locator('h2')).toContainText('Sign in to your account');
    
    // Verify inputs
    await expect(page.getByPlaceholder('Email or Phone Number')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    
    // Verify submit button
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('Signup page renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3005/en/auth/signup');
    
    // Verify title
    await expect(page.locator('h2')).toContainText('Create a new account');
    
    // Verify inputs
    await expect(page.getByPlaceholder('Full Name')).toBeVisible();
    await expect(page.getByPlaceholder('Email or Phone Number')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    
    // Verify submit button
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  });
});
