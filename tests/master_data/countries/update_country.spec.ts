// import { test, expect } from '@playwright/test';
// import { HomePage } from '../../../pages/home.po';
// import { ChildTypesPage } from '../../../pages/master_data/child_types.po';
// import { LoginPage } from '../../../pages/login/login.po';


// test("01. field validations - Title", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage=new HomePage(page);
//   const childTypesPage = new ChildTypesPage(page);

//   await loginPage.loginAsUser();

//   await homePage.masterDataMenu.click();
//   await homePage.childTypeMenu.click();

//   //<test data creation>
//   await childTypesPage.openCreateNewPage();
//   await childTypesPage.titleTextField.fill("Atashinda");
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
//   await childTypesPage.clickCreateButton();
//   //<test data creation>

//   await childTypesPage.openeditPageInRow(0);
//   await childTypesPage.titleTextField.clear();
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
//   await childTypesPage.updateButton.click();

//   await expect(page.getByText('The title field is required.')).toBeVisible();

//   await childTypesPage.titleTextField.fill("exceedmaxlengthTitleexceedmaxlengthTitleexceedmaxle");
//   await childTypesPage.updateButton.click();

//   await expect(page.getByText('The title field must not be greater than 50 characters.')).toBeVisible();

//   await childTypesPage.titleTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
//   await childTypesPage.updateButton.click();

//   //await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");

//   //<delete test data>
//   await childTypesPage.deleteEntryOfRow(0);
//   //<delete test data>

//   await homePage.logOut(page);
// });

// test("02. should not allow duplicate title values", async ({ page }) => {
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

//   await childTypesPage.openeditPageInRow(0);
//   await childTypesPage.titleTextField.fill("Atashinda - HS");
//   await childTypesPage.updateButton.click();

//   await expect(page.getByText('The title has already been taken.')).toBeVisible();
//   await childTypesPage.cancelButton.click();

//   //<delete test data>
//   await childTypesPage.deleteEntryOfRow(0);
//   //<delete test data>

//   await homePage.logOut(page);
// });

// test("03. field validations - Description", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage = new HomePage(page);
//   const childTypesPage = new ChildTypesPage(page);

//   await loginPage.loginAsUser();

//   await homePage.masterDataMenu.click();
//   await homePage.childTypeMenu.click();

//   //<test data creation>
//   await childTypesPage.openCreateNewPage();
//   await childTypesPage.titleTextField.fill("Atashinda");
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
//   await childTypesPage.clickCreateButton();
//   //<test data creation>

//   await childTypesPage.createNewButton.click();
//   await childTypesPage.titleTextField.fill("Atashinda1");
//   await childTypesPage.descriptionTextField.clear();
//   await childTypesPage.updateButton.click();

//   await expect(page.getByText('The description field is required.')).toBeVisible();

//   await childTypesPage.descriptionTextField.fill(
//     "exceedmaxlengthDescription exceedmaxlengthDescription exceedmaxlengthDescription exceedmaxlengthDescription exceedmaxlengthDescription exceedmaxlengthDescription exceedmaxlengthDescription exceedmaxlen");
//   await childTypesPage.updateButton.click();

//   await expect(page.getByText('The description field must not be greater than 200 characters.')).toBeVisible();

//   await childTypesPage.descriptionTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
//   await childTypesPage.updateButton.click();

//   // await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Atashinda1");
//   // await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");

//   //<delete test data>
//   await childTypesPage.deleteEntryOfRow(0);
//   //<delete test data>

//   await homePage.logOut(page);
// });

// test("04. Verify the values in the edit page", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage=new HomePage(page);
//   const childTypesPage = new ChildTypesPage(page);

//   await loginPage.loginAsUser();

//   await homePage.masterDataMenu.click();
//   await homePage.childTypeMenu.click();

//   //<test data creation>
//   await childTypesPage.openCreateNewPage();
//   await childTypesPage.titleTextField.fill("Atashinda");
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
//   await childTypesPage.clickCreateButton();
//   //<test data creation>

//   await childTypesPage.openeditPageInRow(0);
//   await childTypesPage.verifyEditPageValues(["Atashinda", "Atashinda Child Type"]);
//   await childTypesPage.cancelButton.click();

//   //<delete test data>
//   await childTypesPage.deleteEntryOfRow(0);
//   //<delete test data>

//   await homePage.logOut(page);
// });

// test("05. update child type successfully", async ({ page }) => {
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

//   await childTypesPage.openeditPageInRow(0);
//   await childTypesPage.titleTextField.fill("Atashinda_Updated");
//   await childTypesPage.descriptionTextField.fill("Atashinda Child Type_Updated");
//   await childTypesPage.clickUpdateButton();

//   //await expect(page.getByText('Child Type successfully updated.')).toBeVisible();
//   await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Atashinda_Updated");
//   await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Atashinda Child Type_Updated");

//   //<delete test data>
//   await childTypesPage.deleteEntryOfRow(0);
//   //<delete test data>

//   await homePage.logOut(page);
// });





