import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('sorting by price low to high shows the cheapest product first', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');
    // wait for the sort to apply before reading prices
    await expect(productsPage.activeSortOption).toHaveText('Price (low to high)');

    const prices = await productsPage.getPrices();
    expect(prices[0]).toBe(Math.min(...prices));
});
