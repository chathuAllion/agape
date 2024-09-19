import { expect, Locator, Page } from "@playwright/test";

export class ChildTypesPage {
    readonly page: Page;
    readonly createNewButton: Locator;
    readonly titleTextField: Locator;
    readonly descriptionTextField: Locator;
    readonly createButton: Locator;
    readonly cancelButton: Locator;
    readonly pageTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.createNewButton = page.getByRole('button', { name: 'Create' });
        this.titleTextField = page.locator('#title');
        this.descriptionTextField = page.locator('#description');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async checkBookletPageContents() {
        await expect(this.page).toHaveTitle(/Child Types/);
        await expect(this.createNewButton).toBeVisible();
        await expect(this.titleTextField).toBeVisible();

        await expect(this.descriptionTextField).toBeVisible();
        await expect(this.createButton).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
    };
};