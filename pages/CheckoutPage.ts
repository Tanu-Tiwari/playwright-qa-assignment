import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    private page: Page;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.getByRole('heading', { name: 'Thank you for your order!' });
    }

    async startCheckout() {
        await this.page.getByRole('button', { name: 'Checkout' }).click();
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async finishOrder() {
        await this.page.getByRole('button', { name: 'Finish' }).click();
    }
}
