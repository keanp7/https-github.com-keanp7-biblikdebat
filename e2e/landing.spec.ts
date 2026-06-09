import { test, expect } from '@playwright/test';

test('Landing page renders correctly', async ({ page }) => {
  await page.goto('/en');
  
  // Verify heading text
  await expect(page.getByRole('heading', { name: 'Biblik Debat' })).toBeVisible();
  
  // Verify call to actions
  await expect(page.getByRole('link', { name: 'Join the Community' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign In' }).first()).toBeVisible();
});
