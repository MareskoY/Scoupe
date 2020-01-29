import { Browser, elementIsPresent, WebComponent } from '../../lib';
import { AllPages } from '../../common';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { shadowRootLocators } from "../../common/themes";

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Create  Master Page', async () => {
    let pages: AllPages;
    let browser: Browser;

    before(async () => {
        browser = new Browser();
        pages = await new AllPages(browser);

        await pages.browser.setWaitTime(50000, 30000, 30000);
    });

    after(async () => {

    });

    describe('Create "Home" Master Page', async () => {

        it('HP-01 Create Header', async () => {
            await pages.goToTheme();
            await pages.themesPage.clickOnEditMasterPage();
            await pages.themesPage.clickAddBlank();
            await pages.themesPage.clickScreen();
            await pages.themesPage.clickDesktopScreen();
            await pages.themesPage.clickHeaderArea();
        });
    });
});
