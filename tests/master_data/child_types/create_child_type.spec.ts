import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { DBFunctions } from '../../../support/db_functions.po';
import { ChildTypesPage } from '../../../pages/master_data/child_types.po';
import { ConstantsPage } from '../../../support/constants.po';
import { LoginPage } from '../../../pages/login/login.po';


test.beforeEach(async({page})=>{
  const dbFunctions = new DBFunctions();
  const loginPage = new LoginPage(page);
  await dbFunctions.removeDataFromDB('child_types', 'create_child_type');

  await dbFunctions.createDataInDB('child_types', 'create_child_type').then(async function () {
    await loginPage.loginAsUser();
  });
  await page.goto('/childTypes');
});

test("01. field validations - Title", async ({ page }) => {
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  //empty value - not allowed
  await childTypesPage.createNewButton.click();
  await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
  await childTypesPage.createButton.click();
  await expect.soft(page.getByText('The title field is required.')).toBeVisible();

  //exceed max length - not allowed
  await childTypesPage.titleTextField.fill("exceedmaxlengthTitleexceedmaxlengthTitleexceedmaxle");
  await childTypesPage.createButton.click();
  await expect.soft(page.getByText('The title field must not be greater than 50 characters.')).toBeVisible();

  //alpha numeric characters & special characters - allowed
  await childTypesPage.titleTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;\'][");
  await childTypesPage.clickCreateButton();
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"~`!@#$%^&*()_+-=10{}:\"|<>?/.,;\'][");

  await homePage.logOut(page);
});

test("02. field validations - Description", async ({ page }) => {
  const homePage = new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);
  const constantsPage=new ConstantsPage(page);

  //empty value - not allowed
  await childTypesPage.createNewButton.click();
  await childTypesPage.titleTextField.fill("Atashinda1");
  await childTypesPage.createButton.click();
  await expect.soft(page.getByText('The description field is required.')).toBeVisible();

  //exceed max length - not allowed
  await childTypesPage.descriptionTextField.fill(constantsPage.field_length_201_Characters);
  await childTypesPage.createButton.click();
  await expect.soft(page.getByText('The description field must not be greater than 200 characters.')).toBeVisible();

  //alpha numeric characters & special characters - allowed
  await childTypesPage.descriptionTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await childTypesPage.clickCreateButton();
  await childTypesPage.verifyGridColumnHeaders();
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Atashinda1");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");

  await homePage.logOut(page);
});

test("03. add new child type successfully", async ({ page }) => {
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await childTypesPage.createNewButton.click();
  await childTypesPage.titleTextField.fill("Atashinda");
  await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
  await childTypesPage.clickCreateButton();
  await expect.soft(page.getByText('Child Type created successfully.')).toBeVisible();
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Atashinda");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Atashinda Child Type");

  await homePage.logOut(page);
});

test("04. should not allow duplicate title values", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page); 
  
  await dbFunctions.createDataInDB('child_types', 'create_child_type');

  await childTypesPage.createNewButton.click();
  await childTypesPage.titleTextField.fill("Atashinda");
  await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
  await childTypesPage.createButton.click();
  await expect.soft(page.getByText('The title has already been taken.')).toBeVisible();

  await homePage.logOut(page);
});

test("05. should be able to create a new entry with the Title value of a deleted entry", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await dbFunctions.removeDataFromDB('child_types', 'create_child_type');

  await childTypesPage.openCreateNewPage();
  await childTypesPage.titleTextField.fill("Atashinda");
  await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
  await childTypesPage.clickCreateButton();

  //await expect.soft(page.getByText('Child Type created successfully.')).toBeVisible();
  await childTypesPage.verifyGridColumnHeaders();
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Atashinda");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Atashinda Child Type");

  await homePage.logOut(page);
});

test("06. navigations", async ({ page }) => {
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await childTypesPage.createNewButton.click();
  await childTypesPage.cancelButton.click();
  await childTypesPage.waitForLoadingOfGrid();

  await childTypesPage.createNewButton.click();
  await childTypesPage.childTypesLink.click();
  await childTypesPage.waitForLoadingOfGrid();

  await homePage.logOut(page);
});

