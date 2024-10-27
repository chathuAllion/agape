import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { ChildTypesPage } from '../../../pages/master_data/child_types.po';
import { DBFunctions } from '../../../support/db_functions.po';
import { ConstantsPage } from '../../../support/constants.po';

test.beforeEach(async({page})=>{
  const dbFunctions = new DBFunctions();
  await dbFunctions.removeDataFromDB('child_types', 'create_child_type');
});

test("01. field validations - Title", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);
  const constantsPage=new ConstantsPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.openEditPageInRow(0);
  await childTypesPage.titleTextField.clear();
  await childTypesPage.updateButton.click();
  await expect.soft(page.getByText('The title field is required.')).toBeVisible();

  await childTypesPage.titleTextField.fill(constantsPage.field_length_51_Characters);
  await childTypesPage.updateButton.click();
  await expect.soft(page.getByText('The title field must not be greater than 50 characters.')).toBeVisible();

  await childTypesPage.titleTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;\'][");
  await childTypesPage.updateButton.click();
  await expect.soft(page.getByText('Child Type successfully updated.')).toBeVisible();

  await homePage.logOut(page);
});

test("02. should not allow duplicate title values", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');
  await page.goto('/childTypes');

  await childTypesPage.openEditPageInRow(0);
  await childTypesPage.titleTextField.fill("Atashinda - ABD");
  await childTypesPage.updateButton.click();

  await expect.soft(page.getByText('The title has already been taken.')).toBeVisible();
  await childTypesPage.cancelButton.click();

  await homePage.logOut(page);
});

test("03. field validations - Description", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);
  const constantsPage=new ConstantsPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.openEditPageInRow(0);
  await childTypesPage.descriptionTextField.clear();
  await childTypesPage.updateButton.click();
  await expect.soft(page.getByText('The description field is required.')).toBeVisible();

  await childTypesPage.descriptionTextField.fill(constantsPage.field_length_201_Characters);
  await childTypesPage.updateButton.click();
  await expect.soft(page.getByText('The description field must not be greater than 200 characters.')).toBeVisible();

  await childTypesPage.descriptionTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await childTypesPage.updateButton.click();
  await expect.soft(page.getByText('Child Type successfully updated.')).toBeVisible();
  await homePage.logOut(page);
});

test("04. Verify the values in the edit page", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.openEditPageInRow(0);
  await childTypesPage.verifyEditPageValues(["Atashinda", "Atashinda child type"]);
  await childTypesPage.cancelButton.click();

  await homePage.logOut(page);
});

test("05. update child type successfully", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.openEditPageInRow(0);
  await childTypesPage.titleTextField.fill("Atashinda_Updated");
  await childTypesPage.descriptionTextField.fill("Atashinda Child Type_Updated");
  await childTypesPage.updateButton.click();

  await expect.soft(page.getByText('Child Type successfully updated.')).toBeVisible();
  await childTypesPage.cancelButton.click();
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Atashinda_Updated");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Atashinda Child Type_Updated");

  await homePage.logOut(page);
});

test("06. navigations", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.openEditPageInRow(0);
  await childTypesPage.cancelButton.click();
  await childTypesPage.waitForLoadingOfGrid();

  await childTypesPage.openEditPageInRow(0);
  await childTypesPage.childTypesLink.click();
  await childTypesPage.waitForLoadingOfGrid();

  await homePage.logOut(page);
});





