import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { ChildTypesPage } from '../../../pages/master_data/child_types.po';
import { DBFunctions } from '../../../support/db_functions.po';

test.beforeEach(async({page})=>{
  const dbFunctions = new DBFunctions();
  await dbFunctions.removeDataFromDB('child_types', 'create_multiple_child_types');
});


test("01. verify grid columns", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.verifyGridColumnHeaders();

  await homePage.logOut(page);
});


test("02. search by Title", async ({ page }) => {
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);
  const dbFunctions = new DBFunctions();

  await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');
  await page.goto('/childTypes');

  await childTypesPage.enterSearchText("atashinda");
  await childTypesPage.verifyNoOfRows(2);
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Atashinda - ABC");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Special requirements");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(1,0,"Atashinda - ABD");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(1,1,"Higher Education of the child");

  await homePage.logOut(page);
});

test("03. search by Description", async ({ page }) => {
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);  
  const dbFunctions = new DBFunctions();

  await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');
  await page.goto('/childTypes');

  await childTypesPage.enterSearchText("Education");
  await childTypesPage.verifyNoOfRows(2);
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Regular Spon");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Education - School");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(1,0,"Atashinda - ABD");
  await childTypesPage.verifyGridColumnValueByRowNoAndColumnNo(1,1,"Higher Education of the child");

  await homePage.logOut(page);
});

test("04. sort by Title", async ({ page }) => {
  const homePage = new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);
  const dbFunctions = new DBFunctions();

  await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');
  await page.goto('/childTypes');

  await childTypesPage.sortByColumn("Title","Atashinda - ABC");
  await childTypesPage.sortByColumn("Title","Regular Spon");

  await homePage.logOut(page);
});

test("05. sort by Description", async ({ page }) => {
  const homePage = new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);
  const dbFunctions = new DBFunctions();

  await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');
  await page.goto('/childTypes');

  await childTypesPage.sortByColumn("Description","Education - School");
  await childTypesPage.sortByColumn("Description","Special requirements");

  await homePage.logOut(page);
});

test("06. Verify the values in the single record view page", async ({ page }) => {
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);
  const dbFunctions = new DBFunctions();

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.openSingleRecordViewInRow(0);
  await childTypesPage.verifySingleRecordViewValues(["Atashinda", "Atashinda child type"]);
  await childTypesPage.cancelButton.click();

  await homePage.logOut(page);
});

test("07. navigations", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await dbFunctions.createDataInDB('child_types', 'create_child_type');
  await page.goto('/childTypes');

  await childTypesPage.openSingleRecordViewInRow(0);
  await childTypesPage.cancelButton.click();
  await childTypesPage.waitForLoadingOfGrid();

  await childTypesPage.openSingleRecordViewInRow(0);
  await childTypesPage.childTypesLink.click();
  await childTypesPage.waitForLoadingOfGrid();

  await homePage.logOut(page);
});

test("08. verify pagination controls", async ({ page }) => {
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);
  const dbFunctions = new DBFunctions();

  await dbFunctions.createDataInDB('child_types', 'create_bulk_child_types');
  await page.goto('/childTypes');

  await childTypesPage.verifySelectedShowResultsValue('10');
  await childTypesPage.verifyNoOfRows(10);

  await childTypesPage.clickPaginationNextButton();
  await childTypesPage.verifyNoOfRows(6);
  await childTypesPage.verifyNoOfRecordsLabel("Showing 11 to 16 of 16 results");

  await childTypesPage.clickPaginationPreviousButton();
  await childTypesPage.verifyNoOfRows(10);
  await childTypesPage.verifyNoOfRecordsLabel("Showing 1 to 10 of 16 results");

  await childTypesPage.clickPaginationButtonOfPageNo('2');
  await childTypesPage.verifyNoOfRows(6);
  await childTypesPage.verifyNoOfRecordsLabel("Showing 11 to 16 of 16 results");

  await childTypesPage.clickPaginationButtonOfPageNo('1');
  await childTypesPage.verifyNoOfRows(10);
  await childTypesPage.verifyNoOfRecordsLabel("Showing 1 to 10 of 16 results");

  await childTypesPage.selectShowResults('25');
  await childTypesPage.verifyNoOfRows(16);
  await childTypesPage.selectShowResults('50');
  await childTypesPage.verifyNoOfRows(16);
  await childTypesPage.selectShowResults('100');
  await childTypesPage.verifyNoOfRows(16);

  await homePage.logOut(page);
});





