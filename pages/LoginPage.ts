import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    readonly errorMessage: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorMessage = page.getByTestId('error');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.page.getByPlaceholder('Username').fill(username);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.loginButton.click();
    }
}
