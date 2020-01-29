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

describe('Test objects functionality - dropdown', async () => {
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

  describe('test dropdown objects', async () => {
    it('1. Add dropdown onto page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      const dropdownObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DROPDOWN);
      const isDisplayed: boolean = await dropdownObject.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

    it('2. Move the dropdown', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      const dropdownObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DROPDOWN);
      const { top, left }: any = await pages.themesPage.getDropdownPosition();
      await pages.themesPage.moveComponent(dropdownObject);
      const { top: newTop, left: newLeft }: any = await pages.themesPage.getDropdownPosition();
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });

    it('3. Delete dropdown from page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      await pages.themesPage.clickOnRightArrowMenu();
      await pages.themesPage.clickDeleteButton();
      const dropdownObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DROPDOWN);
      const isDisplayed: boolean = await dropdownObject.isDisplayed();
      expect(isDisplayed).to.be.false;
    });

    it('4. Add links to dropdown', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      const dropdownObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DROPDOWN);
      const isDisplayed: boolean = await dropdownObject.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getDropDownAttribute('class');
      expect(classes).to.include('active');
      await pages.themesPage.clickOnLinkTo();
      await pages.themesPage.setLinkTo("www.google.com");
      // let's hide it
      await pages.themesPage.clickOnLinkTo();
      // value should be saved
      await pages.themesPage.clickOnLinkTo();
      // const linkValue: string = await pages.themesPage.getLinkValue();
      // expect(linkValue).to.equal('www.google.com');
    });

    it('5. edit text of individual dropdown', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      await pages.themesPage.doubleClickOnObject(shadowRootLocators.DROPDOWN);
      await pages.themesPage.setText("IamanewTextvalue");
      await pages.themesPage.clickOnCanvas();
      const button: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON_SPAN);
      const text: string = await button.getText();
      expect(text).to.equal("IamanewTextvalue");
    });

    it('6. Resize dropdown in height/width', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnDropDown();
      await pages.themesPage.clickOnDropDownWidget();
      const { top, left } = await pages.themesPage.getObjectPosition(shadowRootLocators.DROPDOWN);
      await pages.themesPage.resizeElement();
      const { top: newTop, left: newLeft } = await pages.themesPage.getObjectPosition(shadowRootLocators.DROPDOWN);
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });

    it('7. Save changes to a text widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      await pages.themesPage.resizeElement();
      const text: WebComponent = await pages.themesPage.getObject(shadowRootLocators.TEXT_OBJECT);
      await pages.themesPage.moveComponent(text);
      await pages.themesPage.setTextValue(" I am a new value");
      const textValue: string = await pages.themesPage.getTextValue(1);
      const { top, left }: any = await pages.themesPage.getTextPosition();
      await pages.themesPage.clickOnSave();
      // let's make sure the changes are saved
      await browser.sleep(5000);
      await browser.getDriver().navigate().refresh();
      const newTextValue: string = await pages.themesPage.getTextValue(1);
      const { top: newTop, left: newLeft }: any = await pages.themesPage.getTextPosition();
      expect(newTop).to.equal(top);
      expect(newLeft).to.equal(left);
      expect(newTextValue).to.equal(textValue);
    });
  });
});
