import {Browser, elementIsPresent, WebComponent} from '../../lib';
import {AllPages} from '../../common';
import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import {shadowRootLocators} from "../../common/themes";

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Test text object functionality', async () => {
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

  describe('Test text widget', async () => {
    it('1. Adds a text widget into page', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      const text: WebComponent = await pages.themesPage.getObject(shadowRootLocators.TEXT_OBJECT_WRAPPER);
      const isTextDisplayed: boolean = await text.isDisplayed();
      expect(isTextDisplayed).to.be.true;

      const textObjectValue: string = await pages.themesPage.getTextValue(1);
      expect(textObjectValue).to.equal('Text');
    });

    it('2. check text widget is highlighted', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      const classes: string = await pages.themesPage.getTextObjectAttribute('class');
      expect(classes).to.include('active');
    });

    it('3. Text widget edit', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      const textObjectValue: string = await pages.themesPage.getTextValue(1);
      expect(textObjectValue).to.equal('Text');

      await pages.themesPage.setTextValue(" I am a new value");
      const newValue: string = await pages.themesPage.getTextValue(1);
      expect(newValue).to.equal('I am a new value');
    });

    it('4. Adds a text widget into page and deletes it', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      await pages.themesPage.deleteTextObject();
      const textObject: WebComponent = await pages.themesPage.getObject(shadowRootLocators.TEXT_OBJECT);
      expect(await textObject.isDisplayed()).to.be.false;
    });

    it('5. Set font family for text widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      await pages.themesPage.changeFontForText();
      const fontFamily: string = await pages.themesPage.getObjectStyle('font-family', shadowRootLocators.TEXT_OBJECT);
      expect(fontFamily).to.include('Open Sans');
    });

     // this includes a bug at the moment
    it('6. Set font color for text widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      await pages.themesPage.setTextValue(" Iamanewvalue");
      await pages.themesPage.clickOnColorPicker();
      await pages.themesPage.changeColor();
      await pages.themesPage.clickOnRightSideBar();
      // this needs to be updated
      const color: string = await pages.themesPage.getObjectStyle('color', shadowRootLocators.TEXT_OBJECT);
    });

    it('7. Moves a text widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      const text: WebComponent = await pages.themesPage.getObject(shadowRootLocators.TEXT_OBJECT_WRAPPER);
      const { top, left }: any = await pages.themesPage.getTextPosition();
      await pages.themesPage.moveComponent(text);
      const { top: newTop, left: newLeft }: any = await pages.themesPage.getTextPosition();
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });

    it('8. Set font size for text widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      await pages.themesPage.changeFontSizeForText();
      const fontSize: string = await pages.themesPage.getObjectStyle('font-size', shadowRootLocators.TEXT_OBJECT);
      expect(fontSize).to.include('17');
    });

    it('9. Set font bold for text widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      await pages.themesPage.changeFontBoldForText();
      const bold: WebComponent = await pages.themesPage.getObject(shadowRootLocators.TEXT_OBJECT_BOLD);
      const isDisplayed: boolean = await bold.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

    it('10. Set right align of text in widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      await pages.themesPage.setTextValue(" Iamanewvalue");
      await pages.themesPage.doubleClickOnObject(shadowRootLocators.TEXT_OBJECT);
      await pages.themesPage.RightAlignButton.click();
      await pages.themesPage.clickOnCanvas();
      const text: WebComponent = await pages.themesPage.getObject(shadowRootLocators.TEXT_OBJECT_INNER);
      const cssValue: string = await text.getElement().getCssValue('text-align');
      expect(cssValue).to.equal('right');
    });

    it('11. Add links to text in text widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      const textObjectValue: string = await pages.themesPage.getTextValue(1);
      expect(textObjectValue).to.equal('Text');
      await pages.themesPage.setTextValue(" I am a new value");
      const newValue: string = await pages.themesPage.getTextValue(1);
      expect(newValue).to.equal('I am a new value');
      await pages.themesPage.doubleClickOnObject(shadowRootLocators.TEXT_OBJECT);
      await pages.themesPage.clickOnLinkTo();
      await elementIsPresent(() => pages.themesPage.TextLinkToInput);
      await pages.themesPage.TextLinkToInput.click();
      await pages.themesPage.TextLinkToInput.sendKeys("www.google.ro");
      await pages.themesPage.clickOnLinkTo();
    });

    it('12. Resize text widget in height/width', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      const { top, left } = await pages.themesPage.getObjectPosition(shadowRootLocators.TEXT_OBJECT_WRAPPER);
      await pages.themesPage.resizeElement();
      const { top: newTop, left: newLeft } = await pages.themesPage
        .getObjectPosition(shadowRootLocators.TEXT_OBJECT_WRAPPER);
      expect(top).to.not.equal(newTop);
      expect(left).to.not.equal(newLeft);
    });

    it('13. Create bullet points in text widget', async () => {
      await pages.goToTheme();
      await pages.themesPage.clickOnCanvas();
      await pages.themesPage.clickOnAddText();
      await pages.themesPage.setTextValue("somevalu");
      await pages.themesPage.doubleClickOnObject(shadowRootLocators.TEXT_OBJECT);
      await pages.themesPage.TextBullet.click();
      await pages.themesPage.clickOnCanvas();
      const listItem: WebComponent = await pages.themesPage.getObject(shadowRootLocators.TEXT_OBJECT_LIST_ITEM);
      const isDisplayed: boolean = await listItem.isDisplayed();
      expect(isDisplayed).to.be.true;
    });
  });
});
