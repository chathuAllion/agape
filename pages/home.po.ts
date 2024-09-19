import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./login/login.po";

export class HomePage {
    readonly page: Page;
    readonly userNameHeader: Locator;
    readonly logOutLink: Locator;
    readonly masterDataMenu: Locator;
    readonly childTypeMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameHeader = page.getByRole('heading', { name: 'System Admin' });
        this.masterDataMenu=page.getByRole('button', { name: 'Master Data' })
        this.childTypeMenu=page.getByRole('link', { name: 'Child Types' })
        this.logOutLink=page.getByText(' Logout');
    }

    async navigateTo(pageUrl: any) {
        await this.page.goto(pageUrl);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    };

    // click on the log out button from drop down menu
    async logOut(page: Page) {
        const loginPage = new LoginPage(page);

        await this.userNameHeader.click();
        await expect(this.logOutLink).toBeVisible();
        await this.logOutLink.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        await expect(loginPage.emailTextField).toBeVisible();
    };
};