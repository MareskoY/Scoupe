import { Browser, WebComponent } from '../../lib';
import { AllPages } from '../../common';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { shadowRootLocators } from "../../common/themes";
import { WebElement } from "selenium-webdriver";

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Test objects functionality ', async () => {
  let pages: AllPages;
  let browser: Browser;

  before(async () => {
    browser = new Browser();
    pages = await new AllPages(browser);

    await pages.browser.setWaitTime(10000, 7000, 7000);
  });

  after(async () => {
    await browser.close();
  });

  describe('test objects', async () => {
    it('1. Add section to page in theme', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnRightSideBar();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddSection()
    });

    it('2. Copy and paste elements via buttons', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickCopyButton();
      await pages.themesPage.clickPasteButton();
      await pages.themesPage.clickDeleteButton();
      const circleObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CIRCLE);
      let isDisplayed: boolean = await circleObject.isDisplayed();
      expect(isDisplayed).to.be.true;
      await pages.themesPage.clickOnThemes();
      await pages.themesPage.clickOnMyThemes();
      await pages.themesPage.clickOnAddThemes();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      await pages.themesPage.clickOnRightArrowMenu();
      await pages.themesPage.clickCopyButton();
      await pages.themesPage.clickPasteButton();
      await pages.themesPage.clickDeleteButton();
      const buttonObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON);
      isDisplayed = await buttonObject.isDisplayed();
      expect(isDisplayed).to.be.true;
      await pages.themesPage.clickOnThemes();
      await pages.themesPage.clickOnMyThemes();
      await pages.themesPage.clickOnAddThemes();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      await pages.themesPage.clickOnRightArrowMenu();
      await pages.themesPage.clickCopyButton();
      await pages.themesPage.clickPasteButton();
      await pages.themesPage.clickDeleteButton();
      const dropdownObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DROPDOWN);
      isDisplayed = await dropdownObject.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

    it('3. Select multiple elements at once', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      const dropdownObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DROPDOWN);
      await pages.themesPage.moveComponent(dropdownObject);

      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnShapes();
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickOnDropdownWithControlKey();

      await pages.themesPage.clickDeleteButton();
      let productObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON);
      let isDisplayed: boolean = await productObject.isDisplayed();
      expect(isDisplayed).to.be.false;
      productObject = await pages.themesPage.getObject(shadowRootLocators.CIRCLE);
      isDisplayed = await productObject.isDisplayed();
      expect(isDisplayed).to.be.false;
    });

    it('4. Highlight widget when hover', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      await pages.themesPage.hoverObject(shadowRootLocators.DROPDOWN);

      const classes: string = await pages.themesPage.getObjectAttribute(shadowRootLocators.DROPDOWN, 'class');
      expect(classes).to.include('hovered');

      await pages.themesPage.DeleteButton.click();

      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnShapes();
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.hoverObject(shadowRootLocators.CIRCLE);

      const newClasses: string = await pages.themesPage.getObjectAttribute(shadowRootLocators.CIRCLE, 'class');
      expect(newClasses).to.include('hovered');

      await pages.themesPage.DeleteButton.click();

      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnShapes();
      await pages.themesPage.clickOnLine();
      await pages.themesPage.hoverObject(shadowRootLocators.LINE);

      const buttonNewClass: string = await pages.themesPage.getLineAttribute('class');
      expect(buttonNewClass).to.include('hovered');

      await pages.themesPage.DeleteButton.click();
    });

    it('5. Highlight Active', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnObject(shadowRootLocators.DROPDOWN);

      const classes: string = await pages.themesPage.getObjectAttribute(shadowRootLocators.DROPDOWN, 'class');
      expect(classes).to.include('active');

      await pages.themesPage.DeleteButton.click();

      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnShapes();
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickOnObject(shadowRootLocators.CIRCLE);

      const newClasses: string = await pages.themesPage.getObjectAttribute(shadowRootLocators.CIRCLE, 'class');
      expect(newClasses).to.include('active');

      await pages.themesPage.DeleteButton.click();

      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnShapes();
      await pages.themesPage.clickOnLine();
      await pages.themesPage.clickOnObject(shadowRootLocators.LINE);

      const buttonNewClass: string = await pages.themesPage.getLineAttribute('class');
      expect(buttonNewClass).to.include('hovered');

      await pages.themesPage.DeleteButton.click();
    });

    it('6. Multi copy/paste', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      const dropdownObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DROPDOWN);
      await pages.themesPage.moveComponent(dropdownObject);

      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnShapes();
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickOnDropdownWithControlKey();

      await pages.themesPage.clickCopyButton();
      await pages.themesPage.clickPasteButton();
      await browser.sleep(2000);
      const allDropdown: WebElement[] = await pages.themesPage.getAllObjects(shadowRootLocators.DROPDOWN);
      expect(allDropdown.length).to.be.equal(2);
      const allCircle: WebElement[] = await pages.themesPage.getAllObjects(shadowRootLocators.CIRCLE);
      expect(allCircle.length).to.be.equal(2);
    });
  });
});
