import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './pages/login/login.po';
import { ConstantsPage } from "./support/constants.po";
import path from 'path';

setup('authenticate', async ({ page }) => {

const loginPage = new LoginPage(page);
const constants = new ConstantsPage(page);

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

  await page.goto('http://localhost:8000/login');
  await loginPage.emailTextField.fill(constants.admin_username);            
  await loginPage.passwordTextField.fill(constants.admin_password);
  await loginPage.signInButton.click();
  await loginPage.page.waitForLoadState('domcontentloaded');
  await loginPage.page.waitForLoadState("networkidle");
  await loginPage.signInButton.waitFor({ state: 'hidden' });

  await page.context().storageState({ path: authFile });

});