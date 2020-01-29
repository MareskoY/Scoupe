import {Browser, WebComponent} from '../../lib';
import {AllPages} from '../../common';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import {shadowRootLocators} from "../../common/themes";
import { WebElement } from "selenium-webdriver";

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Test objects functionality - products', async () => {
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

  describe('Test product object', async () => {
    it('1. Add product widget onto page', async () => {
      await pages.goToTheme();
      await pages.themesPage.addNewProduct();
      const productObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.PRODUCT);
      expect(await productObject.isDisplayed()).to.be.true;
    });

    it('2. move product page widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.addNewProduct();
      const productObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.PRODUCT);
      const { top, left }: any = await pages.themesPage.getProductPosition();
      await pages.themesPage.moveComponent(productObject);
      const { top: newTop, left: newLeft }: any = await pages.themesPage.getProductPosition();
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });

    it('3. select the product widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.addNewProduct();
      const classes: string = await pages.themesPage.getProductAttribute('class');
      expect(classes).to.include('active');
    });

    it('4. delete product page widget from page', async () => {
      await pages.goToTheme();
      await pages.themesPage.addNewProduct();
      let productObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.PRODUCT);
      expect(await productObject.isDisplayed()).to.be.true;
      await pages.themesPage.clickDeleteButton();
      productObject = await pages.themesPage.getObject(shadowRootLocators.PRODUCT);
      expect(await productObject.isDisplayed()).to.be.false;
    });

    it('5. Edit individual product widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.addNewProduct();
      await pages.themesPage.doubleClickOnObject(shadowRootLocators.PRODUCT);
      let isAddProductDisplayed: boolean = await pages.themesPage.AddProductButton.isDisplayed();
      expect(isAddProductDisplayed).to.be.true;
      isAddProductDisplayed = await pages.themesPage.ProductActions.isDisplayed();
      expect(isAddProductDisplayed).to.be.true;
      await pages.themesPage.clickOnProductActions();
      isAddProductDisplayed = await pages.themesPage.DeleteProduct.isDisplayed();
      expect(isAddProductDisplayed).to.be.true;
    });

    it('6. Resize product widget in width', async () => {
      await pages.goToTheme();
      await pages.themesPage.addNewProduct();
      await pages.themesPage.clickOnWidthArrowUp();
      const width: string = await pages.themesPage.getObjectStyle('width', shadowRootLocators.PRODUCT);
      expect(width).to.include('301');
    });

    it('7. Display all products in widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.addNewProduct();
      await pages.themesPage.clickOnCustomSelection();
      await pages.themesPage.clickOnAllProducts();
      const allProducts: WebElement[] = await pages.themesPage.getAllObjects(shadowRootLocators.PRODUCT_PRODUCT);
      // tslint:disable-next-line:no-console
      console.log(`Added products: ${allProducts.length}`);
      expect(allProducts.length).to.be.greaterThan(1);
    });

    it('8. Resize product widget in height', async () => {
      await pages.goToTheme();
      await pages.themesPage.addNewProduct();
      await pages.themesPage.clickOnHeightArrowUp();
      const width: string = await pages.themesPage.getObjectStyle('height', shadowRootLocators.PRODUCT);
      expect(width).to.include('501');
    });

    it('9. Save changes to a product widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.addNewProduct();
      await pages.themesPage.clickOnCustomSelection();
      await pages.themesPage.clickOnAllProducts();
      await pages.themesPage.clickOnHeightArrowUp();
      const product: WebComponent = await pages.themesPage.getObject(shadowRootLocators.PRODUCT);
      await pages.themesPage.moveComponent(product);
      const { top, left }: any = await pages.themesPage.getObjectPosition(shadowRootLocators.PRODUCT);

      await pages.themesPage.clickOnSave();
      // let's make sure the changes are saved
      await browser.sleep(5000);
      await browser.getDriver().navigate().refresh();
      const { top: newTop, left: newLeft }: any = await pages.themesPage.getObjectPosition(shadowRootLocators.PRODUCT);
      const allProducts: WebElement[] = await pages.themesPage.getAllObjects(shadowRootLocators.PRODUCT_PRODUCT);
      // tslint:disable-next-line:no-console
      console.log(`Added products: ${allProducts.length}`);
      expect(allProducts.length).to.be.greaterThan(1);
      expect(newLeft).to.equal(left);
      expect(newTop).to.equal(top);
    });
  });
});
