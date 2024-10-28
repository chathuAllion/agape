// import { test as setup } from '@playwright/test';
// import path from 'path';
// import { ConstantsPage } from '../support/constants.po';
// import { LoginPage } from '../pages/login/login.po';

// const authFile = path.join(__dirname, '../playwright/.auth/user.json');

// setup('authenticate', async ({ page }) => {

//   const loginPage = new LoginPage(page);
//   const constants = new ConstantsPage(page);

//   await page.goto(process.env.APP_URL!);
//   await loginPage.emailTextField.fill(process.env.APP_ADMIN_USERNAME!);            
//   await loginPage.passwordTextField.fill(process.env.APP_ADMIN_PASSWORD!);
//   await loginPage.signInButton.click();
//   await loginPage.page.waitForLoadState('domcontentloaded');
//   await loginPage.page.waitForLoadState("networkidle");
//   await loginPage.signInButton.waitFor({ state: 'hidden' });

//   await page.context().storageState({ path: authFile });
// });