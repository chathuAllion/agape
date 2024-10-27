import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { DBFunctions } from '../../../support/db_functions.po';
import { BankAccountsPage } from '../../../pages/master_data/bank_accounts.po';
import { ConstantsPage } from '../../../support/constants.po';

test.beforeEach(async({page})=>{
  const dbFunctions = new DBFunctions();
  await dbFunctions.removeDataFromDB('bank_accounts', 'create_multiple_bank_accounts');
});

test("01. field validations - Country", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);

  await dbFunctions.createDataInDB('countries', 'create_multiple_countries');
  await page.goto('/bankAccounts');

  //empty value - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankReferenceNameTextField.fill('City Bank Savings');
  await bankAccountsPage.bankNameTextField.fill('City Bank');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.click();
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The country field is required.')).toBeVisible();

  // await bankAccountsPage.countryComboBox.click();
  // await expect(bankAccountsPage.countryComboBox).toHaveText(['Autralia', 'Sri Lanka', 'New Zealand']);

  await homePage.logOut(page);
});

test("02. field validations - Bank Reference Name", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //empty value - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankNameTextField.fill('City Bank');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.click();
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The bank reference name field is required.')).toBeVisible();

  //exceed max length - not allowed
  await bankAccountsPage.bankReferenceNameTextField.fill(constantsPage.field_length_51_Characters);
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The bank reference name field must not be greater than 50 characters.')).toBeVisible();

  //equal to max length - allowed
  await bankAccountsPage.bankReferenceNameTextField.fill(constantsPage.field_length_50_Characters);
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, constantsPage.field_length_50_Characters);
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00014545565545565");

  //duplicate value - not allowed(AGP-209)
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankReferenceNameTextField.fill("AINA Sri Lanka");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankNameTextField.fill('City Bank');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.click();
  await bankAccountsPage.accountNumberTextField.fill('000155555454555');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The reference name has already been taken.')).toBeVisible();

  //alpha numeric characters & special characters - allowed
  await bankAccountsPage.bankReferenceNameTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "000155555454555");

  await homePage.logOut(page);
});

test("03. field validations - Bank Name", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //empty value - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('City Bank');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.click();
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The bank name field is required.')).toBeVisible();

  //exceed max length - not allowed
  await bankAccountsPage.bankNameTextField.fill(constantsPage.field_length_51_Characters);
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The bank name field must not be greater than 50 characters.')).toBeVisible();

  //equal to max length - allowed
  await bankAccountsPage.bankNameTextField.fill(constantsPage.field_length_50_Characters);
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "City Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, constantsPage.field_length_50_Characters);
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00014545565545565");

  //alpha numeric characters & special characters - allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankNameTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('Commercial Bank');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA Aus');
  await bankAccountsPage.accountNumberTextField.click();
  await bankAccountsPage.accountNumberTextField.fill('000146547565545565');
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnHeaders();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "Commercial Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA Aus");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "000146547565545565");

  await homePage.logOut(page);
});

test("04. field validations - Bank Address", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //exceed max length - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankAddressTextField.fill(constantsPage.field_length_201_Characters);
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('City Bank');
  await bankAccountsPage.bankNameTextField.fill('City Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The bank address field must not be greater than 200 characters.')).toBeVisible();

  //equal to max length - allowed
  await bankAccountsPage.bankAddressTextField.fill(constantsPage.field_length_200_Characters);
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "City Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank Wellington");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00014545565545565");

  //alpha numeric characters & special characters - allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankAddressTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('Commercial Bank');
  await bankAccountsPage.bankNameTextField.fill('Com Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Aus');
  await bankAccountsPage.accountNumberTextField.fill('45540544545554');
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "Commercial Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Com Bank Wellington");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Aus");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "45540544545554");

  await homePage.logOut(page);
});

test("05. field validations - Branch", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //empty value - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('City Bank');
  await bankAccountsPage.bankNameTextField.fill('City Bank Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.click();
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect.soft(page.getByText('The branch field is required.')).toBeVisible();

  //exceed max length - not allowed
  await bankAccountsPage.branchTextField.fill(constantsPage.field_length_51_Characters);
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The branch field must not be greater than 50 characters.')).toBeVisible();

  //equal to max length - allowed
  await bankAccountsPage.branchTextField.fill(constantsPage.field_length_50_Characters);
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "City Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank Wellington");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00014545565545565");
  
  //alpha numeric characters & special characters - allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.branchTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('Commercial Bank');
  await bankAccountsPage.bankNameTextField.fill('Com Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Aus');
  await bankAccountsPage.accountNumberTextField.fill('45540544545554');
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "Commercial Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Com Bank Wellington");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Aus");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "45540544545554");

  await homePage.logOut(page);
});


test("06. field validations - Notes", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //exceed max length - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.notesTextArea.fill(constantsPage.field_length_501_Characters);
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('City Bank');
  await bankAccountsPage.bankNameTextField.fill('City Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The notes field must not be greater than 500 characters.')).toBeVisible();

 //equal to max length - allowed
 await bankAccountsPage.notesTextArea.fill(constantsPage.field_length_500_Characters);
 await bankAccountsPage.clickCreateButton();
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "City Bank");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank Wellington");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00014545565545565");

  //alpha numeric characters & special characters - allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.notesTextArea.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('Commercial Bank');
  await bankAccountsPage.bankNameTextField.fill('Com Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Aus');
  await bankAccountsPage.accountNumberTextField.fill('576599889899');
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "Commercial Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Com Bank Wellington");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Aus");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "576599889899");

  await homePage.logOut(page);
});

test("07. field validations - Bank Code", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //exceed max length - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankCodeTextField.fill("00125468254");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('City Bank');
  await bankAccountsPage.bankNameTextField.fill('City Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The bank code field must not have more than 10 digits.')).toBeVisible();

 //equal to max length - allowed
 await bankAccountsPage.bankCodeTextField.fill("0012546825");
 await bankAccountsPage.clickCreateButton();
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "City Bank");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank Wellington");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00014545565545565");

  //alpha numeric characters & special characters - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankCodeTextField.fill("a!@#$%&*()");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('Commercial Bank');
  await bankAccountsPage.bankNameTextField.fill('Com Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Aus');
  await bankAccountsPage.accountNumberTextField.fill('576599889899');
  await bankAccountsPage.clickCreateButton();
  await expect.soft(page.getByText('The bank code field must be an integer value')).toBeVisible();

  await homePage.logOut(page);
});

test("08. field validations - Swift Code", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //exceed max length - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.swiftCodeTextField.fill("ABC-12345754");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('City Bank');
  await bankAccountsPage.bankNameTextField.fill('City Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The swift code field must not be greater than 11 characters.')).toBeVisible();

 //equal to max length - allowed
 await bankAccountsPage.swiftCodeTextField.fill("ABC-1234575");
 await bankAccountsPage.clickCreateButton();
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "City Bank");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank Wellington");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
 await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00014545565545565");

  //alpha numeric characters & special characters - allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.swiftCodeTextField.fill("!@#$%^&*()_");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('Commercial Bank');
  await bankAccountsPage.bankNameTextField.fill('Com Bank Wellington');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Aus');
  await bankAccountsPage.accountNumberTextField.fill('576599889899');
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "Commercial Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Com Bank Wellington");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Aus");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "576599889899");

  await homePage.logOut(page);
});

test("09. field validations - Account Name", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //empty value - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('AINA-1');
  await bankAccountsPage.bankNameTextField.fill('City Bank');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNumberTextField.fill('00014545565545565');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The account name field is required.')).toBeVisible();

  //exceed max length - not allowed
  await bankAccountsPage.accountNameTextField.fill(constantsPage.field_length_51_Characters);
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The account name field must not be greater than 50 characters.')).toBeVisible();

  //equal to max length - allowed
  await bankAccountsPage.accountNameTextField.fill(constantsPage.field_length_50_Characters);
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "AINA-1");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, constantsPage.field_length_50_Characters);
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00014545565545565");

  //alpha numeric characters & special characters - allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('AINA-123');
  await bankAccountsPage.bankNameTextField.fill('Com Bank');
  await bankAccountsPage.branchTextField.fill('Sydney');
  await bankAccountsPage.accountNumberTextField.fill('0001488878565545565');
  await bankAccountsPage.accountNameTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "AINA-123");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Com Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "0001488878565545565");

  await homePage.logOut(page);
});

test("10. field validations - Account Number", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage = new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);
  const constantsPage = new ConstantsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts');

  //empty value - not allowed
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankReferenceNameTextField.fill('AINA-3');
  await bankAccountsPage.bankNameTextField.fill('City Bank');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA New Zealand');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The account number field is required.')).toBeVisible();

  //exceed max length - not allowed
  await bankAccountsPage.accountNumberTextField.fill("12345678911112222333444455556666889");
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('The account number field must not have more than 34 digits.')).toBeVisible();

  //equal to max length - allowed
  await bankAccountsPage.accountNumberTextField.fill("1234567891111222233344445555666689");
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "AINA-3");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA New Zealand");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "1234567891111222233344445555666689");

  //duplicate value - Bank Name and Account Number combination - not allowed(AGP-209)
  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankReferenceNameTextField.fill("AINA Australian New");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankNameTextField.fill('City Bank Australia');
  await bankAccountsPage.branchTextField.fill('Wellington');
  await bankAccountsPage.accountNameTextField.fill('AINA-1234');
  await bankAccountsPage.accountNumberTextField.click();
  await bankAccountsPage.accountNumberTextField.fill('00026556562556569564');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('Another bank account with this bank name and account number exists.')).toBeVisible();

  //alpha numeric characters & special characters - allowed
  await bankAccountsPage.accountNumberTextField.fill('0001555554545551');
  await bankAccountsPage.clickCreateButton();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "AINA Australian New");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA-1234");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "0001555554545551");

  await homePage.logOut(page);
});

test("11. add new bank account successfully", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts')

  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankReferenceNameTextField.fill("AINA Australian Child Sponsorship");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankNameTextField.fill('Bank of Australia');
  await bankAccountsPage.branchTextField.fill('Perth');
  await bankAccountsPage.accountNameTextField.fill('AINA-Aus-Perth');
  await bankAccountsPage.accountNumberTextField.fill('00026556562556569564');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('Bank Account created successfully.')).toBeVisible();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "AINA Australian Child Sponsorship");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "Bank of Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA-Aus-Perth");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00026556562556569564");

  await homePage.logOut(page);
});

test("12. should be able to create a new entry with the Title value of a deleted entry", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);

  await dbFunctions.createDataInDB('bank_accounts', 'create_multiple_bank_accounts');
  await dbFunctions.removeDataFromDB('bank_accounts', 'create_multiple_bank_accounts');
  await page.goto('/bankAccounts')

  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankReferenceNameTextField.fill("AINA Australian Child Sponsorship");
  await bankAccountsPage.countryComboBox.selectOption('Australia');
  await bankAccountsPage.bankNameTextField.fill('Bank of Australia');
  await bankAccountsPage.branchTextField.fill('Perth');
  await bankAccountsPage.accountNameTextField.fill('AINA-Aus-Perth');
  await bankAccountsPage.accountNumberTextField.fill('00026556562556569564');
  await bankAccountsPage.createButton.click();
  await expect(page.getByText('Bank Account created successfully.')).toBeVisible();
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "AINA Australian Child Sponsorship");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 2, "City Bank Australia");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 3, "AINA AUS Spon");
  await bankAccountsPage.verifyGridColumnValueByRowNoAndColumnNo(0, 4, "00026556562556569564");

  await homePage.logOut(page);
});

test("13. navigations", async ({ page }) => {
  const homePage=new HomePage(page);
  const bankAccountsPage = new BankAccountsPage(page);

  await page.goto('/bankAccounts')

  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.cancelButton.click();
  await bankAccountsPage.waitForLoadingOfGrid();

  await bankAccountsPage.createNewButton.click();
  await bankAccountsPage.bankAccountsLink.click();
  await bankAccountsPage.waitForLoadingOfGrid();

  await homePage.logOut(page);
});

