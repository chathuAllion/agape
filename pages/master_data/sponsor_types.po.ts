import { expect, Locator, Page } from "@playwright/test";
import { LOCK } from "sequelize";

export class ChildTypesPage {
    readonly page: Page;
    readonly createNewButton: Locator;
    readonly titleTextField: Locator;
    readonly descriptionTextField: Locator;
    readonly createButton: Locator;
    readonly cancelButton: Locator;
    readonly pageTitle: Locator;
    readonly createNewPageTitle: Locator;
    readonly gridHeaderRow: Locator;
    readonly gridBody: Locator;
    readonly titleColumnHeader: Locator;
    readonly descriptionColumnHeader: Locator;
    readonly createSuccessMessage: Locator;
    readonly childTypesLink: Locator;
    readonly gridLoadingSpinner: Locator;
    readonly deleteConfirmationMessage: Locator;
    readonly searchTextbox: Locator;
    readonly firstRow: Locator;
    readonly updateButton: Locator;

    //view Page
    


    constructor(page: Page) {
        this.page = page;
        this.createNewButton = page.getByRole('button', { name: 'Create' });
        this.titleTextField = page.locator('#title');
        this.descriptionTextField = page.locator('#description');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.gridHeaderRow = page.locator('//thead/tr');
        this.gridBody = page.locator('//table/tbody').first();
        this.pageTitle = page.getByRole('heading', { name: 'Child Types' });
        this.createNewPageTitle = page.getByRole('heading', { name: 'Create Child Type' })
        this.childTypesLink=page.locator('#left-wrapper-container').getByRole('link', { name: 'Child Types' })
        this.gridLoadingSpinner=page.locator('#left-wrapper-container').getByAltText('Loading...').nth(0);
        this.deleteConfirmationMessage=page.getByText('Child Type successfully deleted.');
        this.searchTextbox=page.locator('#search');
        this.firstRow=this.gridBody.locator('tr').nth(0);
        this.updateButton=page.getByRole('button', { name: 'Update' });
    }

    async checkBookletPageContents() {
        await expect(this.page).toHaveTitle(/Child Types/);
        await expect(this.createNewButton).toBeVisible();
        await expect(this.titleTextField).toBeVisible();

        await expect(this.descriptionTextField).toBeVisible();
        await expect(this.createButton).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
    };

    async verifyGridColumnHeaders() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(0)).toContainText("Title");
        await expect.soft(this.gridHeaderRow.getByRole('columnheader').nth(1)).toContainText("Description");
    }

    async verifyGridColumnValueByRowNoAndColumnNo(rowNo: any, columnNo: any, value: any) {
        //await this.pageTitle.waitFor({ state: 'visible' });
        await expect.soft(this.gridBody.getByRole('row').nth(rowNo).getByRole('cell').nth(columnNo)).toContainText(value);
    }

    async verifyNoOfRows(value: any) {
        expect.soft((await (this.page.locator('//table/tbody/tr')).count())).toEqual(value);
    }

    async deleteEntryOfRow(rowNo: any){
        await this.pageTitle.waitFor({ state: 'visible' });
        await this.gridBody.getByRole('row').nth(rowNo).getByRole('cell').nth(2).getByRole('button').nth(2).click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
        await this.deleteConfirmationMessage.waitFor({ state: 'visible' });
    }

    async openCreateNewPage(){
        await this.createNewButton.click();
        //await this.page.waitForLoadState('domcontentloaded');
        //await this.page.waitForLoadState("networkidle");
        await this.createNewPageTitle.waitFor({ state: 'attached' });
    }

    async clickCreateButton() {
        await this.createButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        await this.pageTitle.waitFor({ state: 'visible' });
    };

    async clickUpdateButton() {
        await this.updateButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        await this.pageTitle.waitFor({ state: 'visible' });
    };

    async waitForLoadingOfGrid(){
        await this.gridLoadingSpinner.waitFor({ state: 'hidden' });
    }

    async enterSearchText(value: any){
        await this.searchTextbox.fill(value);
        await this.page.waitForTimeout(1000);
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

    async openeditPageInRow(rowNo: any){
        await this.gridBody.getByRole('row').nth(rowNo).getByRole('cell').nth(2).getByRole('button').nth(1).click();
    }

    async verifySingleRecordViewValues(values:any[]){
        values.forEach(async (element, index) => {
            await expect.soft(this.page.locator('//p').nth(index)).toContainText(element);
        });
    }

    async verifyEditPageValues(values:any[]){
        await expect.soft(this.titleTextField).toHaveValue(values[0]);
        await expect.soft(this.descriptionTextField).toHaveValue(values[1]);
    }

};