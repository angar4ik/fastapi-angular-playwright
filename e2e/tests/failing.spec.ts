import { test, expect } from '@playwright/test';

/**
 * These tests intentionally FAIL to demonstrate Playwright trace artifacts
 * being uploaded to the GitHub Actions pipeline run.
 *
 * Each failed test generates trace.zip, screenshot, and video inside:
 *   e2e/test-results/
 *
 * The GitHub workflow picks these up with `actions/upload-artifact`.
 */

test.describe('Items Page — Deliberately Failing', () => {

  test('FAIL: expects 10 items but API returns only 3', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.item-card', { timeout: 10_000 });

    const cards = page.locator('.item-card');
    // ❌ WRONG — API returns 3 items, not 10
    await expect(cards).toHaveCount(10);
  });

  test('FAIL: asserts wrong header text', async ({ page }) => {
    await page.goto('/');
    // ❌ WRONG — header contains "Demo", not "Production"
    await expect(page.locator('.app-header h1')).toContainText('Production');
  });

  test('FAIL: asserts there are no out-of-stock items', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.item-card');

    // ❌ WRONG — Doodad is out of stock
    await expect(page.locator('.stock-badge')).toHaveCount(0);
  });

});
