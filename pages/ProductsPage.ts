import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    private page: Page;
    readonly title: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly activeSortOption: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.activeSortOption = page.getByTestId('active-option');
        this.productPrices = page.getByTestId('inventory-item-price');
    }

    async addProduct(productName: string) {
        const product = this.page.getByTestId('inventory-item').filter({ hasText: productName });
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async goToCart() {
        await this.page.getByTestId('shopping-cart-link').click();
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option);
    }

    async getPrices(): Promise<number[]> {
        const texts = await this.productPrices.allTextContents();
        return texts.map(t => parseFloat(t.replace('$', '')));
    }
}
