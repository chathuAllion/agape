import { expect, Locator, Page } from "@playwright/test";

export class ConstantsPage {
    readonly page: Page;
    readonly valid_password_1: string;
    readonly admin_username: any;
    readonly admin_password: any;


    constructor(page: Page) {
        this.page = page;
        this.admin_username = "gihan@alliontechnologies.com"
        this.admin_password = "Allion@321";
    }

};