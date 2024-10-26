// import { test, expect } from '@playwright/test';
// import { HomePage } from '../../../pages/home.po';
// import { BankAccountsPage } from '../../../pages/master_data/bank_accounts.po';
// import { DBFunctions } from '../../../support/db_functions.po';

// test.beforeEach(async({page})=>{
//   //const dbFunctions = new DBFunctions();
//   //await dbFunctions.removeDataFromDB('bank_accounts', 'create_multiple_bank_accounts');
// });


// test("01. verify grid columns", async ({ page }) => {
//   const dbFunctions = new DBFunctions();
//   const homePage=new HomePage(page);
//   const bankAccountsPage = new BankAccountsPage(page);

//   await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
//   await page.goto('/bankAccounts');

//   await bankAccountsPage.verifyGridColumnHeaders();

//   await homePage.logOut(page);
// });


// test("02. search by 'Country'", async ({ page }) => {
//   const homePage=new HomePage(page);
//   const bankAccountsPage = new BankAccountsPage(page);
//   const dbFunctions = new DBFunctions();

//   await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
//   await page.goto('/bankAccounts');

//   await bankAccountsPage.enterSearchText("australia");
//   await bankAccountsPage.verifyNoOfRows(1);
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "AINA Australian Sponsorship");
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank Australia");
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA AUS Spon");
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00026556562556569564");

//   await homePage.logOut(page);
// });

// test("03. search by 'Bank Reference Name'", async ({ page }) => {
//   const homePage=new HomePage(page);
//   const bankAccountsPage = new BankAccountsPage(page);
//   const dbFunctions = new DBFunctions();

//   await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');
//   await page.goto('/childTypes');

//   await bankAccountsPage.enterSearchText("Education");
//   await bankAccountsPage.verifyNoOfRows(2);
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Regular Spon");
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Education - School");
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(1,0,"Atashinda - ABD");
//   await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(1,1,"Higher Education of the child");

//   await homePage.logOut(page);
// });

// test("04. sort by Title", async ({ page }) => {
//   const homePage = new HomePage(page);
//   const bankAccountsPage = new BankAccountsPage(page);
//   const dbFunctions = new DBFunctions();

//   await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');

//   await page.goto('/childTypes');
//   await bankAccountsPage.sortByColumn("Title","Atashinda - ABC");
//   await bankAccountsPage.sortByColumn("Title","Regular Spon");

//   await homePage.logOut(page);
// });

// test("05. sort by Description", async ({ page }) => {
//   const homePage = new HomePage(page);
//   const bankAccountsPage = new BankAccountsPage(page);
//   const dbFunctions = new DBFunctions();

//   await dbFunctions.createDataInDB('child_types', 'create_multiple_child_types');

//   await page.goto('/childTypes');
//   await bankAccountsPage.sortByColumn("Description","Education - School");
//   await bankAccountsPage.sortByColumn("Description","Special requirements");

//   await homePage.logOut(page);
// });

// test("06. Verify the values in the single record view page", async ({ page }) => {
//   const homePage=new HomePage(page);
//   const bankAccountsPage = new BankAccountsPage(page);
//   const dbFunctions = new DBFunctions();

//   await dbFunctions.createDataInDB('child_types', 'create_child_type');

//   await page.goto('/childTypes');
//   await bankAccountsPage.openSingleRecordViewInRow(0);
//   await bankAccountsPage.verifySingleRecordViewValues(["Atashinda", "Atashinda child type"]);
//   await bankAccountsPage.cancelButton.click();

//   await homePage.logOut(page);
// });

// test("06. navigations", async ({ page }) => {
//   const dbFunctions = new DBFunctions();
//   const homePage=new HomePage(page);
//   const bankAccountsPage = new BankAccountsPage(page);
//   await dbFunctions.createDataInDB('child_types', 'create_child_type');

//   await page.goto('/childTypes');

//   await bankAccountsPage.openSingleRecordViewInRow(0);
//   await bankAccountsPage.cancelButton.click();
//   await bankAccountsPage.waitForLoadingOfGrid();

//   await bankAccountsPage.openSingleRecordViewInRow(0);
//   await bankAccountsPage.childTypesLink.click();
//   await bankAccountsPage.waitForLoadingOfGrid();

//   await homePage.logOut(page);
// });

// test("07. verify pagination controls", async ({ page }) => {
//   const homePage=new HomePage(page);
//   const bankAccountsPage = new BankAccountsPage(page);
//   const dbFunctions = new DBFunctions();

//   await dbFunctions.createDataInDB('child_types', 'create_bulk_child_types');

//   await page.goto('/childTypes');
//   await bankAccountsPage.verifyNoOfRows(10);

//   await bankAccountsPage.clickPaginationNextButton();
//   await bankAccountsPage.verifyNoOfRows(6);
//   await bankAccountsPage.verifyNoOfRecordsLabel("Showing 11 to 16 of 16 results");

//   await bankAccountsPage.clickPaginationPreviousButton();
//   await bankAccountsPage.verifyNoOfRows(10);
//   await bankAccountsPage.verifyNoOfRecordsLabel("Showing 1 to 10 of 16 results");

//   await bankAccountsPage.clickPaginationButtonOfPageNo('2');
//   await bankAccountsPage.verifyNoOfRows(6);
//   await bankAccountsPage.verifyNoOfRecordsLabel("Showing 11 to 16 of 16 results");

//   await bankAccountsPage.clickPaginationButtonOfPageNo('1');
//   await bankAccountsPage.verifyNoOfRows(10);
//   await bankAccountsPage.verifyNoOfRecordsLabel("Showing 1 to 10 of 16 results");

//   //await bankAccountsPage.verifyAvailableResultCounts(['10','25','50','100']);

//   await bankAccountsPage.selectShowResults('25');
//   await bankAccountsPage.verifyNoOfRows(16);

//   await homePage.logOut(page);
// });





