import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { ChildTypesPage } from '../../../pages/master_data/child_types.po';
import { DBFunctions } from '../../../support/db_functions.po';

test.beforeEach(async({page})=>{
  const dbFunctions = new DBFunctions();
  await dbFunctions.removeDataFromDB('child_types', 'create_child_type');
});

test("01. click the cancel button of the delete confirmation", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.clickDeleteButtonOfRow(0);
  await childTypesPage.verifyDeleteConfirmationMessage('Atashinda');
  await childTypesPage.cancelDeleteConfirmation();
  await childTypesPage.verifyNoDeleteSuccessMessage();

  await childTypesPage.enterSearchText("Atashinda");
  await childTypesPage.verifyNoOfRows(1)

  await homePage.logOut(page);
});

test("02. sucessfully delete a record", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.clickDeleteButtonOfRow(0);
  await childTypesPage.verifyDeleteConfirmationMessage('Atashinda');
  await childTypesPage.confirmDeleteConfirmation();
  await childTypesPage.verifyDeleteSuccessMessage();

  await childTypesPage.enterSearchText("Atashinda");
  await childTypesPage.verifyNoOfRows(0);

  await homePage.logOut(page);
});

test("03. sucessfully delete multiple records one after another", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');
  await page.goto('/childTypes');
  
  await childTypesPage.clickDeleteButtonOfRow(0);
  await childTypesPage.verifyDeleteConfirmationMessage('Regular Spon');
  await childTypesPage.confirmDeleteConfirmation();
  await childTypesPage.verifyDeleteSuccessMessage();

  await childTypesPage.clickDeleteButtonOfRow(0);
  await childTypesPage.verifyDeleteConfirmationMessage('Atashinda - ABC');
  await childTypesPage.confirmDeleteConfirmation();
  await childTypesPage.verifyDeleteSuccessMessage();

  await childTypesPage.enterSearchText("Regular Spon");
  await childTypesPage.verifyNoOfRows(0);
  await childTypesPage.enterSearchText("Atashinda - ABC");
  await childTypesPage.verifyNoOfRows(0);
  await childTypesPage.enterSearchText("Atashinda - ABD");
  await childTypesPage.verifyNoOfRows(1);

  await homePage.logOut(page);
});

