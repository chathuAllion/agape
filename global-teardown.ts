import { test as setup, expect } from '@playwright/test';
var process = require('child_process');

setup('reset database to default', async ({ page }) => {
    await process.exec("php ../../artisan migrate:fresh --seed",
        function (err: any, stderr: any) {
            if (err) {
                console.log(err);
                console.log("\n" + stderr);
                console.log("there was an error resetting the database");
            } else {
                console.log("database successfully reset");
            }
        }
    );
    await page.waitForTimeout(5000);
});