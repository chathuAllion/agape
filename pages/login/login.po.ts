import { expect, Locator, Page } from "@playwright/test";
import { ConstantsPage } from "../../support/constants.po";

export class LoginPage {
    readonly page: Page;
    readonly emailTextField: Locator;
    readonly passwordTextField: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailTextField = page.locator('#email');
        this.passwordTextField = page.locator('#password');
        //this.signInButton = page.getByRole('button', { name: 'Sign                        in' });
        this.signInButton=page.locator("//button[@type='submit']");
    }

    // navigate to desired URL
    async navigateTo(pageUrl: any) {
        await this.page.goto(pageUrl);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    };

    // check contents on login page
    async checkLoginPageContents() {
        await expect(this.page).toHaveTitle(/Online Manager/);
        await expect(this.emailTextField).toBeVisible();
        await expect(this.passwordTextField).toBeVisible();
        await expect(this.signInButton).toBeVisible();
    };

    // check invalid username and password error message
    async checkErrorMessage() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByText('Invalid username or password')).toBeVisible();
    };

    // login with the desired user
    async loginAsUser() {
        const constants = new ConstantsPage(this.page);

        await this.navigateTo('/login');
        await this.emailTextField.fill(constants.admin_username);            
        await this.passwordTextField.fill(constants.admin_password);
        await this.signInButton.click();
    };

};