import { test, expect } from '@playwright/test';

test.describe('Biblik AI Assistant', () => {
  test('AI page renders correctly and allows input', async ({ page }) => {
    await page.goto('/en/ai');
    
    // Verify heading
    await expect(page.getByRole('heading', { name: 'Biblik AI Assistant' })).toBeVisible();
    
    // Verify initial suggestions
    await expect(page.getByRole('button', { name: 'What does John 3:16 mean?' })).toBeVisible();
    
    // Verify chat input is present and enabled
    const chatInput = page.getByPlaceholder('Ask Biblik AI...');
    await expect(chatInput).toBeVisible();
    await expect(chatInput).toBeEnabled();
    
    // Verify send button is present
    const sendButton = page.getByRole('button').locator('svg.lucide-send').locator('..');
    await expect(sendButton).toBeVisible();
  });
});
