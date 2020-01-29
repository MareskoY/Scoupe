import { Browser, WebComponent } from '../../lib';
import { AllPages } from '../../common';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { shadowRootLocators } from "../../common/themes";

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Test objects functionality - line', async () => {
  let pages: AllPages;
  let browser: Browser;

  before(async () => {
    browser = new Browser();
    pages = await new AllPages(browser);

    await pages.browser.setWaitTime(100000, 70000, 70000);
  });

  after(async () => {
    await browser.close();
  });

  describe('test lines', async () => {
    it('1. Add line onto page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnLine();
      const lineObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.LINE);
      const isDisplayed: boolean = await lineObject.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

    it('2. Delete line from page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnLine();
      await pages.themesPage.clickDeleteButton();
      const productObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.LINE);
      const isDisplayed: boolean = await productObject.isDisplayed();
      expect(isDisplayed).to.be.false;
    });

    it('3. Select the line and highlights it', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnLine();
      const circleObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.LINE);
      const isDisplayed: boolean = await circleObject.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getLineAttribute('class');
      expect(classes).to.include('active');
    });

    it('4. Resize line in height/width', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnLine();
      const { top, left } = await pages.themesPage.getObjectPosition(shadowRootLocators.LINE);
      await pages.themesPage.resizeElement();
      const { top: newTop, left: newLeft } = await pages.themesPage.getObjectPosition(shadowRootLocators.LINE);
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });
  });
});
