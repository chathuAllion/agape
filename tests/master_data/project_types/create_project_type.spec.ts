import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { DBFunctions } from '../../../support/db_functions.po';
import { ProjectTypesPage } from '../../../pages/master_data/project_types.po';
import { ConstantsPage } from '../../../support/constants.po';
import { LoginPage } from '../../../pages/login/login.po';

test.beforeEach(async({page})=>{
  const dbFunctions = new DBFunctions();
  const loginPage = new LoginPage(page);
  await dbFunctions.removeDataFromDB('project_types', 'create_project_type');

  await dbFunctions.createDataInDB('project_types', 'create_project_type').then(async function () {
    await loginPage.loginAsUser();
  });
  await page.goto('/projectTypes');
});

test("01. field validations - Project Type", async ({ page }) => {

  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const projectTypesPage = new ProjectTypesPage(page);

  //empty value - not allowed
  await projectTypesPage.clickCreateNewButton();
  await projectTypesPage.descriptionTextField.fill("Child Education");
  await projectTypesPage.createButton.click();
  await expect.soft(page.getByText('The project type field is required.')).toBeVisible();

  //exceed max length - not allowed
  await projectTypesPage.projectTypeTextField.fill("exceedmaxlengthTitleexceedmaxlengthTitleexceedmaxle");
  await projectTypesPage.createButton.click();
  await expect.soft(page.getByText('The project type field must not be greater than 50 characters.')).toBeVisible();

  //alpha numeric characters & special characters - allowed
  await projectTypesPage.projectTypeTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;\'][");
  await projectTypesPage.createButton.click();
  await expect.soft(page.getByText('Project Type created successfully.')).toBeVisible();
  await projectTypesPage.verifyGridColumnHeaders();

  await homePage.logOut(page);
});

test("02. field validations - Description", async ({ page }) => {
  const homePage = new HomePage(page);
  const projectTypesPage = new ProjectTypesPage(page);
  const constantsPage=new ConstantsPage(page);

  //empty value - allowed
  await projectTypesPage.clickCreateNewButton();
  await projectTypesPage.projectTypeTextField.fill("Child Education");
  await projectTypesPage.createButton.click();
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 0, "Child Education");
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0, 1, "");

  //exceed max length - not allowed
  await projectTypesPage.clickCreateNewButton();
  await projectTypesPage.projectTypeTextField.fill("Child Education New");
  await projectTypesPage.descriptionTextField.fill(constantsPage.field_length_201_Characters);
  await projectTypesPage.createButton.click();
  await expect.soft(page.getByText('The description field must not be greater than 200 characters.')).toBeVisible();

  //alpha numeric characters & special characters - allowed
  await projectTypesPage.descriptionTextField.fill("~`!@#$%^&*()_+-=10{}:\"|<>?/.,;'\][");
  await projectTypesPage.clickCreateButton();
  await expect.soft(page.getByText('Project Type created successfully.')).toBeVisible();

  await homePage.logOut(page);
});

test("03. add new project type of relates to children, successfully", async ({ page }) => {;
  const homePage=new HomePage(page);
  const projectTypesPage = new ProjectTypesPage(page);

  await projectTypesPage.clickCreateNewButton();
  await projectTypesPage.projectTypeTextField.fill("Child Higher Education");
  await projectTypesPage.descriptionTextField.fill("Child Higher Education-Higher Studies");
  await projectTypesPage.relatesToChildrenCheckBox.check();
  await projectTypesPage.clickCreateButton();
  await expect.soft(page.getByText('Project Type created successfully.')).toBeVisible();
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Child Higher Education");
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Child Higher Education-Higher Studies");
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,2,"Yes");

  await homePage.logOut(page);
});

test("04. add new project type of not relates to children, successfully", async ({ page }) => {
  const homePage=new HomePage(page);
  const projectTypesPage = new ProjectTypesPage(page);

  await projectTypesPage.clickCreateNewButton();
  await projectTypesPage.projectTypeTextField.fill("Child Higher Education");
  await projectTypesPage.descriptionTextField.fill("Child Higher Education-Higher Studies");
  await projectTypesPage.clickCreateButton();
  await expect.soft(page.getByText('Project Type created successfully.')).toBeVisible();
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Child Higher Education");
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Child Higher Education-Higher Studies");

  await homePage.logOut(page);
});

test("05. should be able to create a new entry with the Title value of a deleted entry", async ({ page }) => {
  const dbFunctions = new DBFunctions();
  const homePage=new HomePage(page);
  const projectTypesPage = new ProjectTypesPage(page);

  await dbFunctions.createDataInDB('project_types', 'create_project_type');
  await dbFunctions.removeDataFromDB('project_types', 'create_project_type');

  await projectTypesPage.clickCreateNewButton();
  await projectTypesPage.projectTypeTextField.fill("Child Care");
  await projectTypesPage.descriptionTextField.fill("Child Care");
  await projectTypesPage.clickCreateButton();

  //await expect.soft(page.getByText('Child Type created successfully.')).toBeVisible();
  await projectTypesPage.verifyGridColumnHeaders();
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,0,"Child Care");
  await projectTypesPage.verifyGridColumnValueByRowNoAndColumnNo(0,1,"Child Care");

  await homePage.logOut(page);
});

test("06. navigations", async ({ page }) => {
  const homePage=new HomePage(page);
  const projectTypesPage = new ProjectTypesPage(page);

  await projectTypesPage.clickCreateNewButton();
  await projectTypesPage.cancelButton.click();
  await projectTypesPage.waitForLoadingOfGrid();

  await projectTypesPage.createNewButton.click();
  await projectTypesPage.projectTypesLink.click();
  await projectTypesPage.waitForLoadingOfGrid();

  await homePage.logOut(page);
});

