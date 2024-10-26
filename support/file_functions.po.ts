import { test, expect, Locator, Page } from "@playwright/test";
import { read, readFile, writeFileXLSX } from 'xlsx';
var process = require('child_process');



export class FileFunctions {

    async downloadFile(page: Page, testInfo: any, btn_name: any, file_name: any) {
        // Start waiting for download before clicking. Note no await.
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('button', { name: btn_name }).click();
        const download = await downloadPromise;

        // Wait for the download process to complete and save the downloaded file somewhere.
        const path = './downloads/' + download.suggestedFilename();
        await download.saveAs(path);
        expect(download.suggestedFilename()).toBe(file_name);

        // will attach downloaded file to playwright report output
        await testInfo.attach('downloaded', { path: path })
        return path;
    };


    async compareFile(downloadedFileName: any, originalFileName: any) {
        const originalFile = readFile("./expected_files/" + originalFileName);
        const downloadedFile = readFile(downloadedFileName);

        expect(originalFile).toStrictEqual(downloadedFile);
    };

    async selectFileForUpload(page: Page, folder_name: any, file_name: any) {
        await page.setInputFiles('input[type="file"]', './uploads/' + folder_name + '/' + file_name);
        await page.waitForTimeout(1000);
    };

    async uploadFile(page: Page, folder_name: any, file_name: any, btn_name: any) {
        await page.setInputFiles('input[type="file"]', './uploads/' + folder_name + '/' + file_name);
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: btn_name }).click();
    };


    // adding some sample code below on how to use jquery to perform some actions, for ex: entering data into a text field
    // 'jquery' needs to be added to package.json file and 'pnpm install' command run after to use the below code

    // import * as $ from 'jquery';

    // Inject jQuery into the page
    // await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.7.1.min.js' });

    // // Fill the text field with jQuery
    // await page.evaluate(() => {
    //   $(document).ready(function () {
    //     $("#bookletMaxPage .p-inputtext").val('12345678567');
    //   });
    // });

};