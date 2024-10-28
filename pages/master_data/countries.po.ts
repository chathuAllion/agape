import { expect, Locator, Page } from "@playwright/test";
import { LOCK } from "sequelize";

export class CountriesPage {
    readonly page: Page;
    readonly createNewButton: Locator;
    readonly countryTextField: Locator;
    readonly countryShortCodeTextField: Locator;
    readonly projectCountryCheckBox: Locator;
    readonly donorCountryCheckBox: Locator;
    readonly createButton: Locator;
    readonly cancelButton: Locator;
    readonly pageTitle: Locator;
    readonly createNewPageTitle: Locator;
    readonly gridHeaderRow: Locator;
    readonly gridBody: Locator;
    readonly countryColumnHeader: Locator;
    readonly countryShortCodeColumnHeader: Locator;
    readonly countryTypeColumnHeader: Locator;
    readonly associatedCurrencyColumnHeader: Locator;
    readonly createSuccessMessage: Locator;
    readonly countriesLink: Locator;
    readonly gridLoadingSpinner: Locator;
    readonly deleteConfirmationMessage: Locator;
    readonly searchTextbox: Locator;
    readonly firstRow: Locator;
    readonly updateButton: Locator;
    readonly deleteConfirmationCancelButton: Locator;
    readonly deleteConfirmationDeleteButton: Locator;
    readonly deleteSuccessMessage: Locator;
    readonly paginationNextButton:Locator;
    readonly paginationPreviousButton:Locator;
    readonly paginationShowNoOfRecordsComboBox:Locator;


    constructor(page: Page) {
        this.page = page;
        this.createNewButton = page.getByRole('button', { name: 'Create' });
        this.countryTextField = page.locator('#name');
        this.countryShortCodeTextField = page.locator('#code');
        this.projectCountryCheckBox=page.locator('#countryTypeProject');
        this.donorCountryCheckBox=page.locator('#countryTypeDonor');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.gridHeaderRow = page.locator('//thead/tr');
        this.gridBody = page.locator('//table/tbody').first();
        this.pageTitle = page.getByRole('heading', { name: 'Countries' });
        this.createNewPageTitle = page.getByRole('heading', { name: 'Create Country' })
        this.countriesLink=page.locator('#left-wrapper-container').getByRole('link', { name: 'Countries' })
        this.gridLoadingSpinner=page.locator('#left-wrapper-container').getByAltText('Loading...').nth(0);
        this.deleteConfirmationMessage=page.getByText('Country Type successfully deleted.');
        this.searchTextbox=page.locator('#search');
        this.firstRow=this.gridBody.locator('tr').nth(0);
        this.updateButton=page.getByRole('button', { name: 'Update' });
        this.deleteConfirmationCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.deleteConfirmationDeleteButton = page.getByRole('button', { name: 'Delete' });
        this.deleteSuccessMessage=page.getByText('Country created successfully.');
        this.paginationNextButton=page.getByRole('button', { name: 'Next' });
        this.paginationPreviousButton=page.getByRole('button', { name: 'Previous' });
        this.paginationShowNoOfRecordsComboBox=page.locator('//select');
    }

    //create
    async clickCreateNewButton() {
        await this.pageTitle.waitFor({ state: 'visible' });
        await this.createNewButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForLoadState("load");
        await this.createNewPageTitle.waitFor({ state: 'visible' });
    };
    
    async clickCreateButton() {
        await this.createButton.click();
         await this.page.waitForLoadState('domcontentloaded');
         await this.page.waitForLoadState("networkidle");
        await this.pageTitle.waitFor({ state: 'visible' });
    };

    //gridview
    async verifyGridColumnHeaders() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(0)).toContainText("Country");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(1)).toContainText("Country Code");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(2)).toContainText("Country Type");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(3)).toContainText("Associated Currency");
    }

    async verifyGridColumnValueByRowNoAndColumnNo(rowNo: any, columnNo: any, value: any) {
        await this.pageTitle.waitFor({ state: 'visible' });
        await expect.soft(this.gridBody.getByRole('row').nth(rowNo).getByRole('cell').nth(columnNo)).toContainText(value);
    }

    async verifyNoOfRows(value: any) {
        expect.soft(await this.page.locator('//table/tbody/tr').count()).toEqual(value);
    }

    async waitForLoadingOfGrid(){
        await this.pageTitle.waitFor({ state: 'visible' });
    }

    async enterSearchText(value: any){
        await this.searchTextbox.fill(value);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    async clearSearchTextBox(){
        await this.searchTextbox.fill("");
        await this.page.waitForTimeout(1000);
    }

    async sortByColumn(column: any, value: any) {
        await this.page.getByRole('columnheader', { name: column }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await expect.soft(this.firstRow).toContainText(value);
    };

    async openSingleRecordViewInRow(rowNo: any){
        await this.gridBody.getByRole('row').nth(rowNo).getByRole('cell').nth(2).getByRole('button').nth(0).click();
    }

    async openEditPageInRow(rowNo: any){
        await this.gridBody.getByRole('row').nth(rowNo).getByRole('cell').nth(2).getByRole('button').nth(1).click();
    }

    async clickPaginationNextButton(){
        await this.paginationNextButton.click();
        await this.page.waitForTimeout(2000);
    }

    async clickPaginationPreviousButton(){
        await this.paginationPreviousButton.click();
        await this.page.waitForTimeout(2000);
    }

    async clickPaginationButtonOfPageNo(pageNo:any){
        await this.page.getByText(pageNo, { exact: true }).click();
        await this.page.waitForTimeout(2000);
    }

    async selectShowResults(value:any){
        await this.paginationShowNoOfRecordsComboBox.selectOption(value);
        await this.page.waitForTimeout(2000);
    }

    async verifyNoOfRecordsLabel(value:any){
        await expect.soft(this.page.getByRole('paragraph')).toContainText(value);
    }

    async verifySelectedShowResultsValue(value:any){
        await expect.soft(this.paginationShowNoOfRecordsComboBox).toHaveValue(value);
    }

    //single record view
    async verifySingleRecordViewValues(values:any[]){
        values.forEach(async (element, index) => {
            await expect.soft(this.page.locator('//p').nth(index)).toContainText(element);
        });
    }

    //update
    async clickUpdateButton() {
        await this.updateButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        //await this.pageTitle.waitFor({ state: 'visible' });
    };

    async verifyEditPageValues(values:any[]){
        await expect.soft(this.countryTextField).toHaveValue(values[0]);
        await expect.soft(this.countryShortCodeTextField).toHaveValue(values[1]);
    }

    //delete
    async deleteEntryOfRow(rowNo: any){
        await this.pageTitle.waitFor({ state: 'visible' });
        await this.gridBody.getByRole('row').nth(rowNo).getByRole('cell').nth(2).getByRole('button').nth(2).click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
        await this.deleteSuccessMessage.waitFor({ state: 'visible' });
    }

    async clickDeleteButtonOfRow(rowNo: any){
        await this.pageTitle.waitFor({ state: 'visible' });
        await this.gridBody.getByRole('row').nth(rowNo).getByRole('cell').nth(2).getByRole('button').nth(2).click();
    }

    async cancelDeleteConfirmation() {
        await this.deleteConfirmationCancelButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        await this.pageTitle.waitFor({ state: 'visible' });
    };

    async confirmDeleteConfirmation() {
        await this.deleteConfirmationDeleteButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        await this.pageTitle.waitFor({ state: 'visible' });
    };

    async verifyDeleteConfirmationMessage(name:any){
        await expect.soft(this.page.getByText('Are you sure you want to delete "'+ name + '" ?')).toBeVisible();
    }

    async verifyDeleteSuccessMessage(){
        await expect.soft(this.deleteSuccessMessage).toBeVisible();
    }

    async verifyNoDeleteSuccessMessage(){
        await expect.soft(this.deleteSuccessMessage).not.toBeVisible();
    }
};