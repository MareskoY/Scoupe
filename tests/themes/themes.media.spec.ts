import {Browser, WebComponent} from '../../lib';
import { AllPages } from '../../common';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import {shadowRootLocators} from "../../common/themes";

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Test objects functionality - media', async () => {
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

  describe('Test media', async () => {


    // tslint:disable-next-line:no-commented-code

    it('1. Add image onto page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnMedia();
      await pages.themesPage.clickOnPicture();
      // image upload goes here
      const mediaImage: WebComponent = await pages.themesPage.getObject(shadowRootLocators.MEDIA);
      const isDisplayed: boolean = await mediaImage.isDisplayed();
      expect(isDisplayed).to.be.true;

    });

    it('2. Replace current image in page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnMedia();
      await pages.themesPage.clickOnPicture();
      // image upload goes here
      const mediaImage: WebComponent = await pages.themesPage.getObject(shadowRootLocators.MEDIA);
      const isDisplayed: boolean = await mediaImage.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getMediaAttribute('class');
      expect(classes).to.include('active');
      await pages.themesPage.clickOnReplace();
      // image upload goes here

    });

    it('3. Delete image from page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnMedia();
      await pages.themesPage.clickOnPicture();
      // image upload goes here
      let mediaImage: WebComponent = await pages.themesPage.getObject(shadowRootLocators.MEDIA);
      let isDisplayed: boolean = await mediaImage.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getMediaAttribute('class');
      expect(classes).to.include('active');
      await pages.themesPage.clickDeleteButton();
      mediaImage = await pages.themesPage.getObject(shadowRootLocators.MEDIA);
      isDisplayed = await mediaImage.isDisplayed();
      expect(isDisplayed).to.be.false;
    });

    it('4. Select the image widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnMedia();
      await pages.themesPage.clickOnPicture();
      // image upload goes here
      const mediaImage: WebComponent = await pages.themesPage.getObject(shadowRootLocators.MEDIA);
      const isDisplayed: boolean = await mediaImage.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getMediaAttribute('class');
      expect(classes).to.include('active');
    });

    it('5. Add multiple images to caroussel', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnMedia();
      await pages.themesPage.clickOnCarousel();
      // image upload goes here
      const mediaImage: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CAROUSEL);
      const isDisplayed: boolean = await mediaImage.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getCarouselAttribute('class');
      expect(classes).to.include('active');
    });

    it('6. Delete individual images in caroussel', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnMedia();
      await pages.themesPage.clickOnCarousel();
      // image upload goes here
      const mediaImage: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CAROUSEL);
      const isDisplayed: boolean = await mediaImage.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getCarouselAttribute('class');
      expect(classes).to.include('active');
      await pages.themesPage.clickOnImagesDropDown();
      await pages.themesPage.clickOnCloseIcon();
    });

    // tslint:disable-next-line:no-identical-functions
    it('7. Select the caroussel widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnMedia();
      await pages.themesPage.clickOnCarousel();
      // image upload goes here
      const mediaImage: WebComponent = await pages.themesPage.getObject(shadowRootLocators.CAROUSEL);
      const isDisplayed: boolean = await mediaImage.isDisplayed();
      expect(isDisplayed).to.be.true;
      const classes: string = await pages.themesPage.getCarouselAttribute('class');
      expect(classes).to.include('active');
    });

  });
});
