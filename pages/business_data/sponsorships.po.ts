import { expect, Locator, Page } from "@playwright/test";

export class SponsorshipsPage {
    readonly page: Page;
    readonly createNewButton: Locator;
    readonly sponsorDropdown: Locator;
    readonly sponsorTypeDropdown: Locator;
    readonly projectSponsoredDropdown: Locator;
    readonly transactionSourceDropdown: Locator;
    readonly paymentFrequencyDropdown: Locator;
    readonly paymentDueDateDatePicker: Locator;
    readonly standardPaymentAmountTextField: Locator;
    readonly paymentCurrencyDropdown: Locator;
    readonly createButton: Locator;
    readonly cancelButton: Locator;
    readonly pageTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.createNewButton = page.getByRole('button', { name: 'Create' });
        this.sponsorDropdown = page.locator('#donorId');
        this.sponsorTypeDropdown = page.locator('#sponsorTypeId');
        this.projectSponsoredDropdown = page.locator('#projectId');
        this.transactionSourceDropdown = page.locator('#transactionSourceId');
        this.paymentFrequencyDropdown = page.locator('#paymentFrequencyId');
        this.paymentDueDateDatePicker = page.locator('#paymentDueDate');
        this.standardPaymentAmountTextField = page.locator('#standardPaymentAmount');
        this.paymentCurrencyDropdown = page.locator('#standardPaymentAmount');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    // async checkBookletPageContents() {
    //     await expect(this.page).toHaveTitle(/Child Types/);
    //     await expect(this.createNewButton).toBeVisible();
    //     await expect(this.titleTextField).toBeVisible();

    //     await expect(this.descriptionTextField).toBeVisible();
    //     await expect(this.createButton).toBeVisible();
    //     await expect(this.cancelButton).toBeVisible();
    // };
};