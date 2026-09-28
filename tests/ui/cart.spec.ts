import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('cart badge shows 2 after adding two products', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProduct('Sauce Labs Backpack');
    await productsPage.addProduct('Sauce Labs Bike Light');

    await expect(productsPage.cartBadge).toHaveText('2');
});
