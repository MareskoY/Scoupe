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

describe('Test objects functionality - button', async () => {
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

  describe('test button', async () => {

    it('1. Add button onto page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      const circleObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON);
      const isDisplayed: boolean = await circleObject.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

    it('2. Delete button from page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      await pages.themesPage.clickOnRightArrowMenu();
      await pages.themesPage.clickDeleteButton();
      const productObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON);
      const isDisplayed: boolean = await productObject.isDisplayed();
      expect(isDisplayed).to.be.false;
    });

    it('3. Select the button and highlights it', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      const buttonObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON);
      const isDisplayed: boolean = await buttonObject.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getButtonAttribute('class');
      expect(classes).to.include('active');

    });

    it('4. Add links to button', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      const buttonObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON);
      const isDisplayed: boolean = await buttonObject.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getButtonAttribute('class');
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

    it('5. edit text of individual button', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      await pages.themesPage.doubleClickOnObject(shadowRootLocators.BUTTON);
      await pages.themesPage.setText("IamanewTextvalue");
      await pages.themesPage.clickOnCanvas();
      const button: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON_SPAN);
      const text: string = await button.getText();
      expect(text).to.equal("IamanewTextvalue");
    });

    it('6. Move the button', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      const button: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON);
      const { top, left }: any = await pages.themesPage.getObjectPosition(shadowRootLocators.BUTTON);
      await pages.themesPage.moveComponent(button);
      const { top: newTop, left: newLeft }: any = await pages.themesPage.getObjectPosition(shadowRootLocators.BUTTON);
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });

    it('7. set border color for button', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      const bg: string = await pages.themesPage.getObjectStyle('border-color', shadowRootLocators.BUTTON);
      await elementIsPresent(() => pages.themesPage.ButtonBorderColorPicker);
      await pages.themesPage.ButtonBorderColorPicker.click();
      await pages.themesPage.changeColor();
      await pages.themesPage.clickOnCanvas();
      const newBg: string = await pages.themesPage.getObjectStyle('background-color', shadowRootLocators.BUTTON);
      expect(bg).to.not.equal(newBg);
    });

    it('8. Resize button in height/width', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      const { top, left } = await pages.themesPage.getObjectPosition(shadowRootLocators.BUTTON);
      await pages.themesPage.resizeElement();
      const { top: newTop, left: newLeft } = await pages.themesPage.getObjectPosition(shadowRootLocators.BUTTON);
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });

    it('9. Set hover color for button', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      const bg: string = await pages.themesPage.getObjectStyle('background-color', shadowRootLocators.BUTTON);
      await pages.themesPage.ButtonHoverColorPicker.click();
      await pages.themesPage.changeColor();
      await pages.themesPage.ButtonHoverColorPicker.click();
      await pages.themesPage.hoverObject(shadowRootLocators.BUTTON);
      // we need this to wait the dom to render
      await browser.sleep(5000);
      const newBg: string = await pages.themesPage.getObjectStyle('background-color', shadowRootLocators.BUTTON);
      expect(bg).to.not.equal(newBg);
    });

    it('10. Set hover color for button text', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();
      const bg: string = await pages.themesPage.getObjectStyle('color', shadowRootLocators.BUTTON_BUTTON);
      await pages.themesPage.ButtonTextHoverColorPicker.click();
      await pages.themesPage.changeColor();
      await pages.themesPage.ButtonTextHoverColorPicker.click();
      await pages.themesPage.hoverObject(shadowRootLocators.BUTTON);
      // we need this to wait the dom to render
      await browser.sleep(5000);
      const newBg: string = await pages.themesPage.getObjectStyle('color', shadowRootLocators.BUTTON_BUTTON);
      expect(bg).to.not.equal(newBg);
    });

    it('11. Set border thickness for button', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();

      const button: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON_BUTTON);
      const style: string = await button.getAttributeValue('style');
      for (let i: number = 0; i < 20; i++) {
        await pages.themesPage.ButtonBorderWidthArrow.click();
      }
      await pages.themesPage.clickOnCanvas();
      await browser.sleep(2000);

      const button2: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON_BUTTON);
      const style2: string = await button2.getAttributeValue('style');

      expect(style2).to.not.equal(style);
    });

    it('12. Set border roundness for button', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnButtons();
      await pages.themesPage.clickOnButtonWidget();

      const button: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON_BUTTON);
      const style: string = await button.getAttributeValue('style');
      for (let i: number = 0; i < 20; i++) {
        await pages.themesPage.ButtonBorderCornersArrow.click();
      }
      await pages.themesPage.clickOnCanvas();
      await browser.sleep(2000);

      const button2: WebComponent = await pages.themesPage.getObject(shadowRootLocators.BUTTON_BUTTON);
      const style2: string = await button2.getAttributeValue('style');

      expect(style2).to.not.equal(style);
    });
  });
});
