import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { SponsorshipsPage } from '../../../pages/business_data/sponsorships.po';
import { LoginPage } from '../../../pages/login/login.po';


// test("01. add new child type", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage=new HomePage(page);
//   const sponsorshipsPage = new SponsorshipsPage(page);

//   await loginPage.loginAsUser();

//   await homePage.masterDataMenu.click();
//   await homePage.childTypeMenu.click();

//   await sponsorshipsPage.createNewButton.click();
//   await sponsorshipsPage.sponsorDropdown.selectOption("Ian Smith");
//   await sponsorshipsPage.sponsorTypeDropdown.selectOption("Project");
//   await sponsorshipsPage.projectSponsoredDropdown.selectOption("test123");
//   await sponsorshipsPage.transactionSourceDropdown.selectOption("Monthly");
//   //await sponsorshipsPage.pa
//   //await childTypesPage.createButton.click();

//   await homePage.logOut(page);
// });