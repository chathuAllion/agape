import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { DBFunctions } from '../../../support/db_functions.po';
import { CountriesPage } from '../../../pages/master_data/countries.po';
import { ConstantsPage } from '../../../support/constants.po';
import { LoginPage } from '../../../pages/login/login.po';


test.beforeEach(async({page})=>{
  const dbFunctions = new DBFunctions();
  const loginPage = new LoginPage(page);
  await dbFunctions.removeDataFromDB('countries', 'create_country');

  await dbFunctions.createDataInDB('countries', 'create_country').then(async function () {
    await loginPage.loginAsUser();
  });
  await page.goto('/countries');
});


test("01. field validations - Country", async ({ page }) => {
  const homePage = new HomePage(page);
  const countriesPage = new CountriesPage(page);
  const constantsPage = new ConstantsPage(page);

  //empty value - not allowed
  await countriesPage.clickCreateNewButton();
  await countriesPage.countryShortCodeTextField.fill('SA');
  await countriesPage.projectCountryCheckBox.check();
  await countriesPage.createButton.click();
  await expect(page.getByText('The name field is required.')).toBeVisible();

  //exceed max length - not allowed
  await countriesPage.countryTextField.fill(constantsPage.field_length_51_Characters);
  await countriesPage.createButton.click();
  await expect(page.getByText('The name field must not be greater than 50 characters.')).toBeVisible();

  //equal to max length - allowed
  await countriesPage.countryTextField.fill(constantsPage.field_length_50_Characters);
  await countriesPage.createButton.click();
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, constantsPage.field_length_50_Characters);
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "SA");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Project Country");

  //duplicate value - not allowed
  await countriesPage.clickCreateNewButton();
  await countriesPage.countryTextField.fill("Sri Lanka");
  await countriesPage.countryShortCodeTextField.fill('SLA');
  await countriesPage.projectCountryCheckBox.check();
  await countriesPage.createButton.click();
  await expect(page.getByText('The name has already been taken.')).toBeVisible();

  //alpha numeric characters & special characters - allowed
  await countriesPage.countryTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await countriesPage.createButton.click();
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "SLA");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Project Country");

  await homePage.logOut(page);
});

test("02. field validations - Country Short Code", async ({ page }) => {
  const homePage = new HomePage(page);
  const countriesPage = new CountriesPage(page);
  const constantsPage = new ConstantsPage(page);

  //empty value - not allowed
  await countriesPage.clickCreateNewButton();
  await countriesPage.countryTextField.fill('Pakistan');
  await countriesPage.projectCountryCheckBox.check();
  await countriesPage.createButton.click();
  await expect(page.getByText('The code field is required.')).toBeVisible();
  
    //exceed max length - not allowed
    await countriesPage.countryShortCodeTextField.fill(constantsPage.field_length_21_Characters);
    await countriesPage.createButton.click();
    await expect(page.getByText('The code field must not be greater than 20 characters.')).toBeVisible();
  
    //equal to max length - allowed
    await countriesPage.countryShortCodeTextField.fill(constantsPage.field_length_20_Characters);
    await countriesPage.createButton.click();
    await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, 'Pakistan');
    await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, constantsPage.field_length_20_Characters);
    await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Project Country");
  
    //alpha numeric characters & special characters - allowed
    await countriesPage.clickCreateNewButton();
    await countriesPage.countryTextField.fill('Maldives');
    await countriesPage.projectCountryCheckBox.check();
    await countriesPage.countryShortCodeTextField.fill("@#$^*_+-1:\"|?/.,;'\\");
    await countriesPage.createButton.click();
    await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Maldives");
    await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "@#$^*_+-1:\"|?/.,;'\\");
    await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Project Country");

  await homePage.logOut(page);
});

test("03 field validations - Country Type", async ({ page }) => {
  const homePage = new HomePage(page);
  const countriesPage = new CountriesPage(page);

  //empty value - not allowed
  await countriesPage.clickCreateNewButton();
  await countriesPage.countryTextField.fill('Pakistan');
  await countriesPage.countryShortCodeTextField.fill('PAK');
  await countriesPage.createButton.click();
  await expect(page.getByText('The country types field is required.')).toBeVisible();

  await homePage.logOut(page);
});

test("04. add new project country successfully", async ({ page }) => {
  const homePage=new HomePage(page);
  const countriesPage = new CountriesPage(page);

  await countriesPage.clickCreateNewButton();
  await countriesPage.countryTextField.fill('Pakistan');
  await countriesPage.countryShortCodeTextField.fill('PAK');
  await countriesPage.projectCountryCheckBox.check();
  await countriesPage.createButton.click();
  await expect(page.getByText('Country created successfully.')).toBeVisible();
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Pakistan");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "PAK");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Project Country");

  await homePage.logOut(page);
});

test("05. add new donor country successfully", async ({ page }) => {
  const homePage=new HomePage(page);
  const countriesPage = new CountriesPage(page);

  await countriesPage.clickCreateNewButton();
  await countriesPage.countryTextField.fill('Canada');
  await countriesPage.countryShortCodeTextField.fill('CAN');
  await countriesPage.donorCountryCheckBox.check();
  await countriesPage.createButton.click();
  await expect(page.getByText('Country created successfully.')).toBeVisible();
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Canada");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "CAN");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Donor Country");

  await homePage.logOut(page);
});

test("06. add new country of country type both successfully", async ({ page }) => {
  const homePage=new HomePage(page);
  const countriesPage = new CountriesPage(page);

  await countriesPage.clickCreateNewButton();
  await countriesPage.countryTextField.fill('Canada');
  await countriesPage.countryShortCodeTextField.fill('CAN');
  await countriesPage.donorCountryCheckBox.check();
  await countriesPage.projectCountryCheckBox.check();
  await countriesPage.createButton.click();
  await expect(page.getByText('Country created successfully.')).toBeVisible();
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Canada");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "CAN");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Both");

  await homePage.logOut(page);
});

test("07. should be able to create a new entry with the country value of a deleted entry", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const countriesPage = new CountriesPage(page);

  await dbFunctions.createDataInDB('countries', 'create_multiple_countries');
  await dbFunctions.removeDataFromDB('countries', 'create_multiple_countries');

  await countriesPage.clickCreateNewButton();
  await countriesPage.countryTextField.fill('Sri Lanka');
  await countriesPage.countryShortCodeTextField.fill('SL');
  await countriesPage.projectCountryCheckBox.check();
  await countriesPage.createButton.click();
  await expect(page.getByText('Country created successfully.')).toBeVisible();
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Sri Lanka");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "SL");
  await countriesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Project Country");

  await homePage.logOut(page);
});

test("08. navigations", async ({ page }) => {
  const homePage=new HomePage(page);
  const countriesPage = new CountriesPage(page);

  await countriesPage.createNewButton.click();
  await countriesPage.cancelButton.click();
  await countriesPage.waitForLoadingOfGrid();

  await countriesPage.createNewButton.click();
  await countriesPage.countriesLink.click();
  await countriesPage.waitForLoadingOfGrid();

  await homePage.logOut(page);
});

