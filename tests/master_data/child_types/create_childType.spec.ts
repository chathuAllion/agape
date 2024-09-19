import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.po';
import { ChildTypesPage } from '../../../pages/master_data/childTypes.po';
import { LoginPage } from '../../../pages/login/login.po';

//const childTypes_page = 'http://localhost:8000/childTypes';
//const home_page = 'http://localhost:8000/';


test("01. add new child type", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage=new HomePage(page);
  const childTypesPage = new ChildTypesPage(page);

  await loginPage.loginAsUser();
  //await loginPage.navigateTo(home_page);
  await homePage.masterDataMenu.click();
  await homePage.childTypeMenu.click();
  //await homePage.navigateTo(childTypes_page)
  await childTypesPage.createNewButton.click();
  await childTypesPage.titleTextField.fill("Atashinda");
  await childTypesPage.descriptionTextField.fill("Atashinda Child Type");
  await childTypesPage.createButton.click();

  await homePage.logOut(page);
});