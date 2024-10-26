import { expect, Locator, Page } from "@playwright/test";
import { LOCK } from "sequelize";

export class BankAccountsPage {
    readonly page: Page;
    readonly createNewButton: Locator;
    readonly createNewPageTitle: Locator;
    readonly countryComboBox: Locator;
    readonly bankReferenceNameTextField: Locator;
    readonly bankNameTextField: Locator;
    readonly bankAddressTextField: Locator;
    readonly branchTextField: Locator;
    readonly notesTextArea: Locator;
    readonly bankCodeTextField: Locator;
    readonly swiftCodeTextField: Locator;
    readonly accountNameTextField: Locator;
    readonly accountNumberTextField: Locator;
    readonly createButton: Locator;
    readonly cancelButton: Locator;
    readonly createSuccessMessage: Locator;
    readonly pageTitle: Locator;
    readonly gridHeaderRow: Locator;
    readonly gridBody: Locator;
    readonly bankAccountsLink: Locator;
    readonly gridLoadingSpinner: Locator;
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
        this.createNewPageTitle = page.getByRole('heading', { name: 'Create Bank Account' })
        this.countryComboBox=page.locator('#countryId');
        this.bankReferenceNameTextField=page.locator('#reference_name');
        this.bankNameTextField=page.locator('#bank_name');
        this.bankAddressTextField = page.locator('#bank_address');
        this.branchTextField = page.locator('#branch');
        this.notesTextArea = page.locator('#notes');
        this.bankCodeTextField = page.locator('//input').nth(5);
        this.swiftCodeTextField = page.locator('#swift_code');
        this.accountNameTextField = page.locator('#account_name');
        this.accountNumberTextField = page.locator('//input').nth(8);
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.createSuccessMessage=page.getByText('Bank Account created successfully.');
        this.pageTitle = page.getByRole('heading', { name: 'Bank Accounts' });
        this.gridHeaderRow = page.locator('//thead/tr');
        this.gridBody = page.locator('//table/tbody').first();
        this.bankAccountsLink=page.locator('#left-wrapper-container').getByRole('link', { name: 'Bank Accounts' })
        this.gridLoadingSpinner=page.locator('#left-wrapper-container').getByAltText('Loading...').nth(0);
        this.searchTextbox=page.locator('#search');
        this.firstRow=this.gridBody.locator('tr').nth(0);
        this.updateButton=page.getByRole('button', { name: 'Update' });
        this.deleteConfirmationCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.deleteConfirmationDeleteButton = page.getByRole('button', { name: 'Delete' });
        this.deleteSuccessMessage=page.getByText('Bank Account successfully deleted.');
        this.paginationNextButton=page.getByRole('button', { name: 'Next' });
        this.paginationPreviousButton=page.getByRole('button', { name: 'Previous' });
        this.paginationShowNoOfRecordsComboBox=page.locator('//select');
    }

    //create
    async openCreateNewPage(){
        await this.createNewButton.click();
        await this.createNewPageTitle.waitFor({ state: 'attached' });
    }

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
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(1)).toContainText("Bank Reference Name");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(2)).toContainText("Bank Name");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(3)).toContainText("Account Name");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(4)).toContainText("Account Number");
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
        await this.page.getByRole('combobox').selectOption(value);
        await this.page.waitForTimeout(2000);
    }

    async verifyNoOfRecordsLabel(value:any){
        await expect.soft(this.page.getByRole('paragraph')).toContainText(value);
    }

    async verifyAvailableResultCounts(values:any[]){
        await expect.soft(this.paginationShowNoOfRecordsComboBox).toHaveValues(values);
        await this.page.waitForTimeout(2000);
    }

    //single record view
    async verifySingleRecordViewValues(values:any[]){
        values.forEach(async (element, index) => {
            await expect.soft(this.page.locator('//p').nth(index)).toContainText(element);
        });
    }

    //edit
    async clickUpdateButton() {
        await this.updateButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        await this.pageTitle.waitFor({ state: 'visible' });
    };

    async verifyEditPageValues(values:any[]){
        await expect.soft(this.countryComboBox).toHaveValue(values[0]);
        await expect.soft(this.bankReferenceNameTextField).toHaveValue(values[1]);
        await expect.soft(this.bankNameTextField).toHaveValue(values[2]);
        await expect.soft(this.bankAddressTextField).toHaveValue(values[3]);
        await expect.soft(this.branchTextField).toHaveValue(values[4]);
        await expect.soft(this.notesTextArea).toHaveValue(values[5]);
        await expect.soft(this.bankCodeTextField).toHaveValue(values[6]);
        await expect.soft(this.swiftCodeTextField).toHaveValue(values[7]);
        await expect.soft(this.accountNameTextField).toHaveValue(values[8]);
        await expect.soft(this.accountNumberTextField).toHaveValue(values[9])
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