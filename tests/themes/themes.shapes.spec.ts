import {Browser, elementIsPresent, WebComponent} from '../../lib';
import { AllPages } from '../../common';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { shadowRootLocators } from "../../common/themes";

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

// tslint:disable-next-line:no-big-function
describe('Test objects functionality - shapes', async () => {
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

  describe('test shapes', async () => {
    it('1. Add shape onto page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnCircle();
      const circleObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CIRCLE);
      const isDisplayed: boolean = await circleObject.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

    it('2. Delete shape from page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickDeleteButton();
      const productObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CIRCLE);
      expect(await productObject.isDisplayed()).to.be.false;
    });

    it('3. Select the shape and highlights it', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCircle();
      const circleObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CIRCLE);
      const isDisplayed: boolean = await circleObject.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getShapeAttribute('class');
      expect(classes).to.include('active');
    });

    it('4. set background color of shape', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnCircle();
      const bg: string = await pages.themesPage.getObjectStyle('background-color', shadowRootLocators.CIRCLE);
      await pages.themesPage.BackgroundColorPicker.click();
      await pages.themesPage.changeColor();
      const newBg: string = await pages.themesPage.getObjectStyle('background-color', shadowRootLocators.CIRCLE);
      expect(bg).to.not.equal(newBg);
    });

    it('5. Set shadow blur for shape', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickOnShadowDropDown();
      await pages.themesPage.clickOnDropShadow();
      await pages.themesPage.clickOnBlurArrowUp();
      const blur: string = await pages.themesPage.getObjectStyle('box-shadow', shadowRootLocators.CIRCLE);
      expect(blur).to.include('6');
    });

    it('6. Set shadow offset for shape', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickOnShadowDropDown();
      await pages.themesPage.clickOnDropShadow();
      await pages.themesPage.clickOnOffsetArrowUp();
      const offset: string = await pages.themesPage.getObjectStyle('box-shadow', shadowRootLocators.CIRCLE);
      expect(offset).to.include('3');
    });

    it('7. Set opacity of the shape', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickOnShadowDropDown();
      await pages.themesPage.clickOnDropShadow();
      await pages.themesPage.clickOnOpacityArrowDown();
      const opacity: string = await pages.themesPage.getObjectStyle('opacity', shadowRootLocators.CIRCLE);
      expect(opacity).to.include('0.99');
    });

    it('8. Set opacity for line', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnLine();
      await pages.themesPage.clickOnOpacityArrowDown2();
      const opacity: string = await pages.themesPage.getObjectStyle('opacity', shadowRootLocators.LINE);
      expect(opacity).to.include('0.99');
    });

    it('9. Resize the shape in height/width', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      const isShapesDisplayed: boolean = await pages.themesPage.Shapes.isDisplayed();
      expect(isShapesDisplayed).to.be.true;
      await pages.themesPage.clickOnCircle();
      const { top, left } = await pages.themesPage.getObjectPosition(shadowRootLocators.CIRCLE);
      await pages.themesPage.resizeElement();
      const { top: newTop, left: newLeft } = await pages.themesPage.getObjectPosition(shadowRootLocators.CIRCLE);
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });

    it('10 Save changes to a shape widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.resizeElement();
      const circle: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CIRCLE);
      await pages.themesPage.moveComponent(circle);
      await pages.themesPage.BackgroundColorPicker.click();
      await pages.themesPage.changeColor();
      await pages.themesPage.BackgroundColorPicker.click();
      const { top, left }: any = await pages.themesPage.getObjectPosition(shadowRootLocators.CIRCLE);
      const bg: string = await pages.themesPage.getObjectStyle('background-color', shadowRootLocators.CIRCLE);
      await pages.themesPage.clickOnSave();
      // let's make sure the changes are saved
      await browser.sleep(5000);
      await browser.getDriver().navigate().refresh();
      const { top: newTop, left: newLeft }: any = await pages.themesPage.getObjectPosition(shadowRootLocators.CIRCLE);
      const newBg: string = await pages.themesPage.getObjectStyle('background-color', shadowRootLocators.CIRCLE);
      expect(newTop).to.equal(top);
      expect(newLeft).to.equal(left);
      expect(bg).to.equal(newBg);
    });

    it('11. Set shadow on the shape', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickOnShadowDropDown();
      await pages.themesPage.clickOnDropShadow();
      const boxShadow: string = await pages.themesPage.getObjectStyle('box-shadow', shadowRootLocators.CIRCLE);
      await elementIsPresent(() => pages.themesPage.ShadowColor);
      await pages.themesPage.ShadowColor.click();
      await pages.themesPage.changeColor();
      await pages.themesPage.clickOnShadowColorButton();
      const newBoxShadow: string = await pages.themesPage.getObjectStyle('box-shadow', shadowRootLocators.CIRCLE);
      expect(boxShadow).to.not.equal(newBoxShadow);
    });
  });
});
