import { test, expect } from '@playwright/test';

test.describe('Items Page — Passing', () => {

  test('page loads and shows the header', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.app-header h1')).toHaveText(
      '📦 FastAPI + Angular + Playwright Demo'
    );
  });

  test('renders item list from the API', async ({ page }) => {
    await page.goto('/');
    // Wait for loading to finish — items should appear
    await page.waitForSelector('.item-card', { timeout: 10_000 });
    const cards = page.locator('.item-card');
    await expect(cards).toHaveCount(3);

    // Widget should be present
    await expect(cards.nth(0).locator('.item-name')).toHaveText('Widget');
  });

  test('shows "Out of stock" badge for unavailable items', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.item-card');

    // The Doodad (id=3) is out of stock
    const outOfStockItems = page.locator('.item-card.out-of-stock');
    await expect(outOfStockItems).toHaveCount(1);

    const badge = outOfStockItems.locator('.stock-badge');
    await expect(badge).toHaveText('Out of stock');
  });

});
