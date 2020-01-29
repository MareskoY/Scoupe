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

describe('Test objects functionality - cart', async () => {
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

  describe('test cart', async () => {
    it('1. Add cart icon onto page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCart();
      await pages.themesPage.clickOnCartWidget();
      const cartObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CART);
      const isDisplayed: boolean = await cartObject.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

    it('2. Delete cart icon from page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCart();
      await pages.themesPage.clickOnCartWidget();
      await pages.themesPage.clickDeleteButton();
      const cartObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CART);
      const isDisplayed: boolean = await cartObject.isDisplayed();
      expect(isDisplayed).to.be.false;
    });

    it('3. Select the cart icon and highlights it', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCart();
      await pages.themesPage.clickOnCartWidget();
      const cartObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CART);
      const isDisplayed: boolean = await cartObject.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getCartAttribute('class');
      expect(classes).to.include('active');
    });

    it('4. Set display type: number/dot for cart icon', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCart();
      await pages.themesPage.clickOnCartWidget();
      await elementIsPresent(() => pages.themesPage.QuantityDropdown);
      await pages.themesPage.QuantityDropdown.click();
      await elementIsPresent(() => pages.themesPage.QuantityNumberOption);
      await pages.themesPage.QuantityNumberOption.click();
      const classes: string = await pages.themesPage.getObjectAttribute(shadowRootLocators.CART_INNER_ELEMENT, 'class');
      expect(classes).to.include('quantity');
    });

    it('5. Resize cart proportionally', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCart();
      await pages.themesPage.clickOnCartWidget();
      const { top, left } = await pages.themesPage.getObjectPosition(shadowRootLocators.CART);
      await pages.themesPage.resizeElement();
      const { top: newTop, left: newLeft } = await pages.themesPage.getObjectPosition(shadowRootLocators.CART);
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });
  });
});
