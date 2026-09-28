import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('user can complete checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addProduct('Sauce Labs Backpack');
    await productsPage.addProduct('Sauce Labs Bike Light');
    await productsPage.goToCart();

    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInformation('Tanu', 'Tiwari', '560066');
    await checkoutPage.finishOrder();

    await expect(checkoutPage.successMessage).toBeVisible();
});
