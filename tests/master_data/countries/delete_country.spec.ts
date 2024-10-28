// import { test, expect } from '@playwright/test';
// import { HomePage } from '../../../pages/home.po';
// import { ChildTypesPage } from '../../../pages/master_data/bank_accounts.po';
// import { LoginPage } from '../../../pages/login/login.po';


// test("01. click the cancel button of the delete confirmation", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage=new HomePage(page);
//   const childTypesPage = new ChildTypesPage(page);

//   await loginPage.loginAsUser();

//   await homePage.masterDataMenu.click();
//   await homePage.childTypeMenu.click();

//   //<test data creation>
//   await childTypesPage.createNewButton.click();
//   await childTypesPage.titleTextField.fill("Atashinda");
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
//   await childTypesPage.clickCreateButton();
//   //<test data creation>

//   await childTypesPage.gridBody.getByRole('row').nth(0).getByRole('cell').nth(2).getByRole('button').nth(2).click();
//   await expect(page.getByText('Are you sure you want to delete "Atashinda" ?')).toBeVisible();
//   await childTypesPage.page.getByRole('button', { name: 'Cancel' }).click();
//   await expect(childTypesPage.deleteConfirmationMessage).not.toBeVisible();

//   await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Atashinda");
//   await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Atashinda Child Type");

//   //<delete test data>
//   await childTypesPage.deleteEntryOfRow(0);
//   //<delete test data>

//   await homePage.logOut(page);
// });

// test("02. sucessfully delete a record", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage=new HomePage(page);
//   const childTypesPage = new ChildTypesPage(page);

//   await loginPage.loginAsUser();

//   await homePage.masterDataMenu.click();
//   await homePage.childTypeMenu.click();

//   //<test data creation>
//   await childTypesPage.createNewButton.click();
//   await childTypesPage.titleTextField.fill("Child Type1");
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
//   await childTypesPage.clickCreateButton();
//   //<test data creation>

//   await childTypesPage.gridBody.getByRole('row').nth(0).getByRole('cell').nth(2).getByRole('button').nth(2).click();
//   await expect(page.getByText('Are you sure you want to delete "Child Type1" ?')).toBeVisible();
//   await childTypesPage.page.getByRole('button', { name: 'Delete' }).click();
//   await childTypesPage.deleteConfirmationMessage.waitFor({ state: 'visible' });

//   await childTypesPage.enterSearchText("Child Type1");
//   await childTypesPage.verifyNoOfRows(0);

//   await homePage.logOut(page);
// });

// test("03. sucessfully delete multiple records one after another", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage=new HomePage(page);
//   const childTypesPage = new ChildTypesPage(page);

//   await loginPage.loginAsUser();

//   await homePage.masterDataMenu.click();
//   await homePage.childTypeMenu.click();

//   //<test data creation>
//   await childTypesPage.openCreateNewPage();
//   await childTypesPage.titleTextField.fill("Child Type1");
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
//   await childTypesPage.clickCreateButton();
//   await childTypesPage.openCreateNewPage();
//   await childTypesPage.titleTextField.fill("Child Type2");
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
//   await childTypesPage.clickCreateButton();
//   //<test data creation>

//   await childTypesPage.gridBody.getByRole('row').nth(0).getByRole('cell').nth(2).getByRole('button').nth(2).click();
//   await expect(page.getByText('Are you sure you want to delete "Child Type2" ?')).toBeVisible();
//   await childTypesPage.page.getByRole('button', { name: 'Delete' }).click();
//   await childTypesPage.deleteConfirmationMessage.waitFor({ state: 'visible' });

//   await childTypesPage.gridBody.getByRole('row').nth(0).getByRole('cell').nth(2).getByRole('button').nth(2).click();
//   await expect(page.getByText('Are you sure you want to delete "Child Type1" ?')).toBeVisible();
//   await childTypesPage.page.getByRole('button', { name: 'Delete' }).click();
//   await childTypesPage.deleteConfirmationMessage.waitFor({ state: 'visible' });

//   await childTypesPage.enterSearchText("Child Type11");
//   await childTypesPage.verifyNoOfRows(0);
//   await childTypesPage.enterSearchText("Child Type12");
//   await childTypesPage.verifyNoOfRows(0);

//   await homePage.logOut(page);
// });

