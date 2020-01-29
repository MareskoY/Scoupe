import { Browser, elementIsPresent, WebComponent } from '../../lib';
import { AllPages } from '../../common';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { shadowRootLocators } from "../../common/themes";
import { By, WebElement } from "selenium-webdriver";

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Test Themes functionality', async () => {
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

  describe('Test themes', async () => {
    it('1. creates a new theme for business', async () => {
      await pages.goToTheme();
      const numberOfSections: number = await pages.themesPage.getSectionsNumber();
      expect(numberOfSections).to.equal(3);
    });

    it('2. edit theme', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnThemes();
      await pages.themesPage.clickOnEditTheme();
      await elementIsPresent(() => pages.themesPage.Canvas);
      const isCanvasDisplayed: boolean = await pages.themesPage.Canvas.isDisplayed();
      expect(isCanvasDisplayed).to.be.true;
    });

    it('3. Set page title of individual page', async () => {
      const value: string = " I am a new value";
      await pages.goToTheme();
      await pages.themesPage.clickSeoIcon();
      await pages.themesPage.clickOnPageTitle();
      await pages.themesPage.setPageTitleInput(value);
      await pages.themesPage.clickOnShowInSearch();
      await pages.themesPage.clickSeoIcon();
      await pages.themesPage.clickOnSave();
      await pages.themesPage.clickOnPublish();
      await pages.themesPage.clickOnVersionName();
      await pages.themesPage.setVersionName(`Version${Date.now()}`);
      await pages.themesPage.clickOnCreate();
      await pages.themesPage.clickOnVersionActions();
      await pages.themesPage.clickOnPublishVersion();
      const text: string = await pages.themesPage.PageLabel.getText();
      expect(text).to.equal(value.trim());
    });

    it('4. Set URL of page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickSeoIcon();
      await pages.themesPage.setUrlInput("www.google.com");
      await pages.themesPage.clickSeoIcon();
      await pages.themesPage.clickOnSave();
      await pages.themesPage.clickOnVersionName();
      await pages.themesPage.setVersionName(`Version${Date.now()}`);
      await pages.themesPage.clickOnCreate();
      await pages.themesPage.clickOnVersionActions();
      await pages.themesPage.clickOnPublishVersion();
    });

    it('5. set background color of entire page', async () => {
      await pages.goToTheme();
      await elementIsPresent(() => pages.themesPage.BackgroundColorPicker);
      const webComponent: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DOCUMENT);
      const bg: string = await webComponent.getElement().getCssValue('background-color');
      await pages.themesPage.BackgroundColorPicker.click();
      await pages.themesPage.changeColor();
      await pages.themesPage.BackgroundColorPicker.click();
      const newWC: WebComponent = await pages.themesPage.getObject(shadowRootLocators.DOCUMENT);
      const newBg: string = await newWC.getElement().getCssValue('background-color');
      expect(bg).to.not.equal(newBg);
    });

    it('6. Select an individual section from theme page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      const sections: WebElement[] = await pages.themesPage.getAllObjects(shadowRootLocators.SECTIONS);
      const sectionClasses: string = await sections[1].getAttribute('class');
      expect(sectionClasses).to.include('active');
    });

    it('7. Header, Body, Footer are default and cannot be deleted', async () => {
      await pages.goToTheme();
      const sections: WebElement[] = await pages.themesPage.getAllObjects(shadowRootLocators.SECTIONS);
      const firstLength: number =sections.length;
      expect(firstLength).to.equal(3);
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.DeleteButton.click();
      const newSections: WebElement[] = await pages.themesPage.getAllObjects(shadowRootLocators.SECTIONS);
      const sectionsAfterDelete: number =newSections.length;
      expect(sectionsAfterDelete).to.equal(3);
    });

    it('8. Selected section content displayed correctly in right sidebar', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnObjects();
      await pages.themesPage.clickOnCircle();
      await pages.themesPage.clickOnRightSideBar();
      await elementIsPresent(() => pages.themesPage.RightSidebarDocument);
      // this xpath is hardcoded because I select the shape from under the second section in the right sidebar
      const element: WebElement = await browser.getDriver().findElement(By.xpath("(//div[contains(@class, 'details')]/span/span[contains(text(), 'Section')])[2]/../../following-sibling::div/div[2]//div/span/span[contains(text(), 'Shape')]"));
      const isDisplayed: boolean = await element.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

    it('9. Resize section in height', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await browser.sleep(2000);
      const height: string = await pages.themesPage.getObjectStyle('height', shadowRootLocators.SECTIONS_FIRST);
      const anchor: WebComponent = await pages.themesPage.getObject(shadowRootLocators.ANCHOR);
      await elementIsPresent(() => anchor);
      await pages.themesPage.moveComponent(anchor);
      const newHeight: string = await pages.themesPage.getObjectStyle('height', shadowRootLocators.SECTIONS_FIRST);
      expect(height).to.not.equal(newHeight);
    })
  });

  describe('Test pages', async () => {
    it('1. should add a new blank page', async () => {
      await pages.goToTheme();
      await pages.themesPage.addBlankPage();
      const isAddedPageDisplayed: boolean = await pages.themesPage.AddedPage.isDisplayed();
      expect(isAddedPageDisplayed).to.be.true;
      const numberOfSections: number = await pages.themesPage.getSectionsNumber();
      expect(numberOfSections).to.equal(3);
    });

    it('2. Add a new master page in theme', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnEditMasterPage();
      await pages.themesPage.clickOnAddPageButton();
      const isAddedPageDisplayed: boolean = await pages.themesPage.MasterAddedPage.isDisplayed();
      expect(isAddedPageDisplayed).to.be.true;
      const numberOfSections: number = await pages.themesPage.getSectionsNumber();
      expect(numberOfSections).to.equal(3);
    });

    it('3. Add a new master page to document', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnEditMasterPage();
      await pages.themesPage.clickOnAddPageButton();
      await pages.themesPage.clickOnEditMasterPage();
      await pages.themesPage.addExistingMasterPage();
      const isAddedPageDisplayed: boolean = await pages.themesPage.AddedPage.isDisplayed();
      expect(isAddedPageDisplayed).to.be.true;
      const numberOfSections: number = await pages.themesPage.getSectionsNumber();
      expect(numberOfSections).to.equal(3);
    });
  });

  describe('test publish', async () => {
    it('1. Publish version of theme to online shop', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnPublish();
      await pages.themesPage.clickOnVersionName();
      await pages.themesPage.setVersionName(`Version${Date.now()}`);
      await pages.themesPage.clickOnCreate();
      await pages.themesPage.clickOnVersionActions();
      await pages.themesPage.clickOnPublishVersion();
      const isPublishedGreenDotDisplayed: boolean = await pages.themesPage.PublishedGreenDot.isDisplayed();
      expect(isPublishedGreenDotDisplayed).to.be.true;
    });

    it('2. Create versioned snapshot of theme', async () => {
      await pages.goToTheme();
      const date: number = Date.now();
      const versionName: string = `Version${date}`;
      await pages.themesPage.clickOnPublish();
      await pages.themesPage.setVersionName(versionName);
      await pages.themesPage.clickOnCreate();
      const isVersionActionsDisplayed: boolean = await pages.themesPage.VersionActions.isDisplayed();
      expect(isVersionActionsDisplayed).to.be.true;
      const version: string = await pages.themesPage.getFirstVersion();
      expect(version).to.equal(versionName);
    });
    it('3. Switch shop online/offline', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnSettings();
      await pages.themesPage.clickOnLiveStatusThumb();
      const live: string = await pages.themesPage.LiveStatusThumb.getAttributeValue('aria-checked');
      expect(live).to.include('true');
    });

    it('4. Set a shop domain name for shop', async () => {
      const value: string = `pay${Date.now()}`;

      await pages.goToTheme();
      await pages.themesPage.clickOnSettings();
      await pages.themesPage.clickOnEditDomain();
      await pages.themesPage.setDomainName(value);
      await pages.themesPage.clickOnDone();
      await browser.sleep(5000);
      const domainName: string = await pages.themesPage.getDomainNameValue();
      await browser.getDriver().navigate().refresh();
      expect(domainName).to.include(value);
    });
  });
});
