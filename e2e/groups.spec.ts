import { test, expect } from '@playwright/test';

test.describe('Groups & Communities', () => {
  test('Groups page renders and lists communities', async ({ page }) => {
    await page.goto('/en/groups');
    
    // Verify heading
    await expect(page.getByRole('heading', { name: 'Communities' })).toBeVisible();
    
    // Verify Create Group button
    await expect(page.getByRole('link', { name: 'Create Group' })).toBeVisible();
    
    // Depending on the DB state, it might say "No groups found" or list groups.
    // We check for either the "No groups found" text OR the presence of at least one group card.
    const noGroups = page.getByText('No groups found');
    const groupCard = page.getByText('View Community →').first();
    
    await expect(noGroups.or(groupCard)).toBeVisible();
  });
});
