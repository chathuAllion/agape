import { expect, Locator, Page } from "@playwright/test";

export class ConstantsPage {
    readonly page: Page;
    readonly valid_password_1: string;
    readonly admin_username: any;
    readonly admin_password: any;
    readonly field_length_10_Characters: string;
    readonly field_length_11_Characters: string;
    readonly field_length_21_Characters: string;
    readonly field_length_20_Characters: string;
    readonly field_length_51_Characters: string;
    readonly field_length_50_Characters: string;
    readonly field_length_31_Characters: string;
    readonly field_length_201_Characters: string;
    readonly field_length_200_Characters: string;
    readonly field_length_251_Characters: string;
    readonly field_length_256_Characters: string;
    readonly field_length_501_Characters: string;
    readonly field_length_500_Characters: string;



    constructor(page: Page) {
        this.page = page;
        this.admin_username = "gihan@alliontechnologies.com"
        this.admin_password = "Allion@321";
        this.field_length_10_Characters=""
        this.field_length_11_Characters="ten charact";
        this.field_length_21_Characters="character length twen";
        this.field_length_20_Characters="character length twe";
        this.field_length_51_Characters="character length fifty one character length fifty o";
        this.field_length_50_Characters="character length fifty character length fifty char";
        this.field_length_31_Characters="character length thirty one cha";
        this.field_length_201_Characters="character length two hundred character length two hu"
                                        +"ndred character length two hundred character length two"
                                        +" hundred character length two hundred character length two"
                                        +" hundred character length two hundre";
        this.field_length_200_Characters="character length two hundred character length two hu"
                                        +"ndred character length two hundred character length two"
                                        +" hundred character length two hundred character length two"
                                        +" hundred character length two hundr";
        this.field_length_251_Characters="character length two hundred and fifty one character length"
                                        +" two hundred and fifty one character length two hundred and fifty"
                                        +" one character length two hundred and fifty one character length two"
                                        +" hundred and fifty one character length two hundred and fif";
        this.field_length_256_Characters="character length two hundred and fifty six character length two hundred"
                                        +" and fifty six character length two hundred and fifty six character length"
                                        +" two hundred and fifty six character length two hundred and fifty six character"
                                        +" length two hundred and fifty si";
        this.field_length_501_Characters="character length five hundred and one characters character length five hundred and"
                                        +" one characters character length five hundred and one characters character length five"
                                        +" hundred and one characters character length five hundred and one characters character"
                                        +" length five hundred and one characters character length five hundred and one characters"
                                        +" character length five hundred and one characters character length five hundred and one"
                                        +" characters character length five hundred and one characters character l";
        this.field_length_500_Characters="character length five hundred character length five hundred character length five hundred"
                                        +" character length five hundred character length five hundred character length five hundred"
                                        +" character length five hundred character length five hundred character length five hundred"
                                        +" character length five hundred character length five hundred character length five hundred"
                                        +" character length five hundred character length five hundred character length five hundred"
                                        +" character length five hundred character length fiv"
    }

};