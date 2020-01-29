import {Browser, Button, elementIsPresent, elementIsVisible, findBy, findByXpath, Page, WebComponent} from '../lib';

import { environment } from '../environments/environment';
import { By, Key, until, WebDriver, WebElement, WebElementPromise } from "selenium-webdriver";

export enum shadowRootLocators {
  CIRCLE = 'pe-builder-elements-shape',
  SECTIONS = 'pe-builder-elements-section',
  SECTIONS_FIRST = 'pe-builder-elements-section:first-child',
  SECTIONS_SPAN = 'pe-builder-elements-section span',
  TEXT_OBJECT_WRAPPER = 'pe-builder-elements-text',
  TEXT_OBJECT = 'pe-builder-elements-text div',
  TEXT_OBJECT_INNER = 'pe-builder-elements-text div div',
  TEXT_OBJECT_BOLD = 'pe-builder-elements-text  div b',
  TEXT_OBJECT_LIST_ITEM = 'pe-builder-elements-text  div ul li',
  PRODUCT = 'pe-builder-elements-product',
  PRODUCT_PRODUCT = 'pe-builder-elements-product div div',
  LINE = 'pe-builder-elements-shape',
  BUTTON = 'pe-builder-elements-button',
  BUTTON_BUTTON = 'pe-builder-elements-button button',
  BUTTON_SPAN = 'pe-builder-elements-button button span span',
  DROPDOWN = 'pe-builder-elements-button',
  CART = 'pe-builder-elements-cart',
  CART_INNER_ELEMENT = 'pe-builder-elements-cart i span span',
  MEDIA = 'pe-builder-elements-image',
  CAROUSEL = 'pe-builder-elements-carousel',
  DOCUMENT = 'pe-builder-elements-document',
  CIRCLES = 'circle.ng-star-inserted',
  ANCHOR = 'pe-editor-element-anchors rect',
}

export class ThemesPage extends Page {

  @findByXpath("//*[@class='pe-editor-canvas']")
  public Canvas: WebComponent;

  @findByXpath("(//div[@class='page-button__label'])[2]")
  public AddedPage: WebComponent;

  @findByXpath("//div[@class='page-button__label' and contains(text(), 'Master')] ")
  public MasterAddedPage: WebComponent;

  @findByXpath("(//div[contains(@class,'details ng-tns-c6-12 ng-star-inserted')])[4]")
  public Section: WebComponent;

  @findByXpath("(//span[contains(@class,'version-actions mat-menu-trigger')])[1]")
  public VersionActions: WebComponent;

  @findByXpath("(//button[contains(@class,'published-dot ng-star-inserted')])[1]")
  public PublishedGreenDot: WebComponent;

  @findByXpath("//div[contains(@class,'category-button active ng-star-inserted')]")
  public Shapes: WebComponent;

  @findByXpath("//button[contains(@class, 'button-control')]//span[contains(text(), 'Delete')]")
  public DeleteButton: Button;

  @findByXpath("(//div[contains(@class,'category-button ng-star-inserted')])[1]")
  public Buttons: WebComponent;

  @findByXpath("//input[@placeholder='Enter Url']")
  public TextLinkToInput: WebComponent;

  @findByXpath("(//div[contains(@class,'page-button__label')])[1]")
  public PageName: WebComponent;

  @findByXpath("//button[contains(@class,'mat-button-fit-content mat-menu-trigger mat-button mat-button-base mat-default mat-button-bold')]")
  public AddProductButton: WebComponent;

  @findByXpath("(//button[contains(@class,'btn btn-default btn-link product-actions-btn mat-menu-trigger')])[1]")
  public ProductActions: WebComponent;

  @findByXpath("(//button[contains(@class,'mat-menu-item ng-star-inserted')])[2]")
  public DeleteProduct: WebComponent;

  @findByXpath("(//button[contains(@class, 'btn-colorpicker')])[1]")
  public BackgroundColorPicker: Button;

  @findByXpath("(//div[@class='mat-select-value'])[1]")
  public QuantityDropdown: WebComponent;

  @findByXpath("(//span[@class='mat-option-text'])[1]")
  public QuantityNumberOption: WebComponent;

  @findByXpath("(//button[@class=\"btn btn-default btn-colorpicker btn-colorpicker-panel dropdown-toggle mat-menu-trigger\"])[3]")
  public ButtonBorderColorPicker: WebComponent;

  @findByXpath("(//button[contains(@class, 'text-editor-action')])[6]")
  public RightAlignButton: Button;

  @findByXpath("//div[contains(@class, 'details')]/span/span[contains(text(), 'Document')]")
  public RightSidebarDocument: WebComponent;

  @findByXpath("//span[contains(text(), 'Themes')]")
  private ThemesMenuItem: WebComponent;

  @findByXpath("//div[contains(text(), 'My themes')]")
  private MyThemes: WebComponent;

  @findByXpath("//*[@data-pe-themes='add']")
  private AddNewTheme: WebComponent;

  @findBy("div.pages-list")
  private LeftSidebar: WebComponent;

  @findByXpath("(//div[@class='button-group']//button/span[@class='mat-button-wrapper'])[1]")
  private LeftSideBarButton: Button;

  @findByXpath("(//div[@class='button-label' and contains(text(), 'Product')]/../button)[1]")
  private ProductButton: Button;

  @findByXpath("//*[contains(text(), 'add') and contains(@class, 'icon')]/../..")
  private AddPageButton: Button;

  @findByXpath("//div[contains(text(), 'Blank page')]")
  private BlankPage: WebComponent;

  @findByXpath("(//div[contains(@class,'theme-card-menu')])[1]")
  private ThemeMenu: WebComponent;

  @findByXpath("//div[contains(@class,'mat-menu-item ng-star-inserted')]")
  private EditTheme: WebComponent;

  @findByXpath("(//div[@class='master-page__preview'])[2]")
  private MasterPage1: WebComponent;

  @findByXpath("//div[contains(@class,'master-page__preview')]")
  private MasterPage: WebComponent;

  @findByXpath("(//button[contains(@class,'button-control mat-button mat-button-base ng-star-inserted')])[2]")
  private RightSideBar: WebComponent;

  @findByXpath("(//button[contains(@class,'button-control mat-button mat-button-base ng-star-inserted')])[3]")
  private EditMasterPage: WebComponent;

  @findByXpath("//div[contains(text(), 'Text')]/../button[contains(@class, 'button-control')]")
  private AddText: Button;

  @findByXpath(("//div[@class='mat-select-value']"))
  private FontsDropdown: WebComponent;

  @findByXpath("//span[contains(text(), 'Open Sans') and @class='mat-option-text']")
  private OpenSansOption: WebComponent;

  @findByXpath("(//pe-builder-navbar-controls-button[contains(@class,'ng-star-inserted')])[1]")
  private AddSectionButton: WebComponent;

  @findByXpath("//span[contains(text(),'Publish')]")
  private Publish: WebComponent;

  @findByXpath("//input[contains(@id,'version-name')]")
  private VersionName: WebComponent;

  @findByXpath("(//pe-builder-navbar-top-button[contains(@class,'button')])[14]")
  private Create: WebComponent;

  @findByXpath("(//button[contains(@class,'mat-menu-item')])[2]")
  private PublishVersion: WebComponent;

  @findByXpath("(//button[contains(@class,'button-control mat-menu-trigger mat-button mat-button-base ng-star-inserted')])[1]")
  private Objects: WebComponent;

  @findByXpath("(//div[contains(@class,'shapes-container ng-star-inserted')])[1]")
  private Line: WebComponent;

  @findByXpath("//img[contains(@class,'icon-20 ng-star-inserted')]")
  private Product: WebComponent;

  @findByXpath("//button[contains(@class,'btn btn-default btn-colorpicker btn-colorpicker-panel dropdown-toggle mat-menu-trigger')]")
  private ColorPicker: WebComponent;

  @findByXpath("//div[contains(@class,'cursor')]")
  private Color: WebComponent;

  @findByXpath("(//span[@class='version-version'])[1]")
  private FirstVersion: WebComponent;

  @findByXpath("//input[@name='version-name']")
  private VersionInput: WebComponent;

  @findByXpath("//div[contains(@class,'shape-circle')]")
  private Circle: WebComponent;

  @findByXpath("//div[contains(@class, 'hex')]/div[@class='box']/input")
  private ColorInput: WebComponent;

  @findByXpath("//button[contains(@class,'mat-raised-button mat-button-base ng-star-inserted')]")
  private ButtonWidget: WebComponent;

  @findByXpath("(//button[contains(@class, 'mat-button-xs')])[2]")
  private rightArrowMenu: WebComponent;

  @findByXpath("(//div[contains(@class,'category-button ng-star-inserted')])[2]")
  private DropDown: WebComponent;

  @findByXpath("//button[contains(@class,'mat-raised-button mat-button-base ng-star-inserted')]")
  private DropDownWidget: WebComponent;

  @findByXpath("(//div[contains(@class,'category-button ng-star-inserted')])[3]")
  private Cart: WebComponent;

  @findByXpath("//div[contains(@class,'selected-category-item ng-star-inserted')]")
  private CartWidget: WebComponent;

  @findBy("div .canvas-container .pe-editor-canvas")
  private ShadowRootParent: WebComponent;

  @findByXpath("(//button[contains(@class, 'button-theme-options')])[1]")
  private ThemesDots: WebComponent;

  @findByXpath("(//button[contains(@class,'mat-menu-trigger mat-raised-button mat-button-base mat-muted-dark button-settings-toggle mat-button-xxs mat-button-menu mat-button-small-padding')])[1]")
  private LinkTo: WebComponent;

  @findByXpath("(//div[contains(@class,'mat-form-field-infix')])[6]/div/input")
  private LinkToInput: WebComponent;

  @findByXpath("//button[contains(@class, 'button-control')]//span[contains(text(), 'Copy')]")
  private CopyButton: WebComponent;

  @findByXpath("//button[contains(@class, 'button-control')]//span[contains(text(), 'Paste')]")
  private PasteButton: WebComponent;

  @findByXpath("//div[contains(text(), 'Shapes')]")
  private ShapesMenuItem: WebComponent;

  @findByXpath("(//button[contains(@class,'button-control mat-button mat-button-base ng-star-inserted')])[7]")
  private SeoIcon: WebComponent;

  @findByXpath("(//div[contains(@class,'mat-form-field-infix')]/div//input)[2]")
  private PageTitle: WebComponent;

  @findByXpath("(//div[contains(@class,'mat-slide-toggle-thumb')])[1]")
  private ShowInSearch: WebComponent;

  @findByXpath("(//div[contains(@class,'mat-form-field-infix')]/div//input)[3]")
  public UrlInput: WebComponent;

  @findByXpath("button-control mat-menu-trigger mat-button mat-button-base ng-star-inserted")
  private Media: WebComponent;

  @findByXpath("(//button[contains(@class,'button-control mat-button mat-button-base ng-star-inserted')])[10]")
  private Replace: WebComponent;

  @findByXpath("(//button[contains(@class,'menu-button mat-menu-item ng-star-inserted')])[1]")
  private Picture: WebComponent;

  @findByXpath("(//button[contains(@class,'menu-button mat-menu-item ng-star-inserted')])[2]")
  private Carousel: WebComponent;

  @findByXpath("(//button[contains(@class,'mat-menu-trigger mat-raised-button mat-button-base mat-muted-dark button-settings-toggle mat-button-xxs mat-button-menu mat-button-small-padding')])[1]")
  private Images: WebComponent;

  @findByXpath("(//div[contains(@class,'link-menu-item-btn-icon')])[1]")
  private CloseIcon: WebComponent;

  @findByXpath("(//button[contains(@class, 'button-control')])[11]")
  private Save: WebComponent;

  @findByXpath("//span[contains(@class,'control-caret-up')]")
  private ArrowUp: WebComponent;

  @findByXpath("(//button[contains(@class,'text-editor-action ng-star-inserted')])[1]")
  private BoldIcon: WebComponent;

  @findByXpath("(//span[contains(@class,'control-caret-up')])[1]")
  private WidthArrowUp: WebComponent;

  @findByXpath("(//div[contains(@class,'mat-form-field-infix')])[1]")
  private CustomSelection: WebComponent;

  @findByXpath("(//span[contains(@class,'mat-option-text')])[1]")
  private AllProducts: WebComponent;

  @findByXpath("(//span[contains(@class,'control-caret-up')])[2]")
  private HeightArrowUp: WebComponent;

  @findByXpath("(//div[contains(@class,'mat-select-trigger')])[2]")
  private Shadow: WebComponent;

  @findByXpath("(//span[contains(@class,'mat-option-text')])[2]")
  private DropShadow: WebComponent;

  @findByXpath("(//span[@class='number-controls ng-star-inserted']/span/*)[1]")
  private BlurArrowUp: WebComponent;

  @findByXpath("(//span[@class='number-controls ng-star-inserted']/span/*)[3]")
  private OffsetArrowUp: WebComponent;

  @findByXpath("(//span[@class='number-controls ng-star-inserted']/span/*)[6]")
  private OpacityArrowDown: WebComponent;

  @findByXpath("(//span[@class='number-controls ng-star-inserted']/span/*)[2]")
  private OpacityArrowDown2: WebComponent;

  @findByXpath("(//span[contains(@class,'mat-toolbar-link-text ng-star-inserted')])[7]")
  private Settings: WebComponent;

  @findByXpath("//div[contains(@class,'mat-slide-toggle-thumb-container')]/../input")
  public LiveStatusThumb: WebComponent;

  @findByXpath("(//button[@class='btn btn-default btn-colorpicker btn-colorpicker-panel dropdown-toggle mat-menu-trigger'])[4]")
  public ButtonHoverColorPicker: Button;

  @findByXpath("(//button[@class='btn btn-default btn-colorpicker btn-colorpicker-panel dropdown-toggle mat-menu-trigger'])[5]")
  public ButtonTextHoverColorPicker: Button;

  @findByXpath("(//button[contains(@class,'mat-button mat-button-link mat-button-no-padding mat-button-sm')])[1]")
  private EditDomainName: WebComponent;

  @findByXpath("//input[contains(@id,'mat-input-0')]")
  private DomainNameInput: WebComponent;

  @findByXpath("(//div[contains(@class,'mat-button-ripple mat-ripple')])[3]")
  private DoneButton: WebComponent;

  @findByXpath("(//button[contains(@class,'btn btn-default btn-colorpicker btn-colorpicker-panel dropdown-toggle mat-menu-trigger')])[3]")
  public ShadowColor: WebComponent;

  @findByXpath("(//button[contains(@class,'btn btn-default btn-colorpicker btn-colorpicker-panel dropdown-toggle mat-menu-trigger')])[4]")
  public Hover: WebComponent;

  @findByXpath("(//span[contains(@class,'control-caret-up')])[3]")
  public ButtonBorderWidthArrow: WebComponent;

  @findByXpath("(//button[@class='text-editor-action ng-star-inserted'])[7]")
  public TextBullet: WebComponent;

  @findByXpath("(//span[contains(@class,'control-caret-up')])[2]")
  public ButtonBorderCornersArrow: WebComponent;

  @findByXpath("//div[@class='page-button__label']")
  public PageLabel: WebComponent;

  @findByXpath("(//span[contains(@class,'section-placeholder ng-star-inserted')])[1]")
  public HeaderArea: WebComponent;

  @findByXpath("(//span[contains(@class,'section-placeholder ng-star-inserted')])[2]")
  public BodyArea: WebComponent;

  @findByXpath("(//span[contains(@class,'section-placeholder ng-star-inserted')])[3]")
  public FooterArea: WebComponent;

  @findByXpath("//button[@class='add-page-button mat-button mat-button-base ng-star-inserted']")
  public AddBlank: WebComponent;

  @findByXpath("(//button[contains(@class,'button-control mat-menu-trigger mat-button mat-button-base ng-star-inserted')])[3]")
  private Screen: WebComponent;

  @findByXpath("(//button[contains(@class,'menu-button mat-menu-item ng-star-inserted')])[1]")
  private DesktopScreen: WebComponent;





  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${environment.commerceosFrontendUrl}/builder/themes/`);
  }

  public loadCondition(): any {
    return elementIsPresent(() => this.ThemesMenuItem);
  }

  public async clickOnThemes(): Promise<void> {
    try {
      await this.browser.setWaitTime(100000, 100000, 100000);
      // this is needed because page focuses on other menu item
      // when rendering. when rerendering, sometimes, selenium clicks on themes
      // but the page rerenders and switches back to the first page
      await this.browser.sleep(2000);
      await elementIsPresent(() => this.ThemesMenuItem);
      await this.ThemesMenuItem.click();
      await this.browser.sleep(2000);
      await elementIsPresent(() => this.MyThemes);
    } catch (ex) {
      // for debug purposes will be removed
      console.log(ex);
      throw ex;
    }
  }

  public async clickOnMyThemes(): Promise<void> {
    try {
      await elementIsPresent(() => this.MyThemes);
      await this.browser.getDriver().wait(until.elementIsVisible(this.MyThemes.getElement()));
      await this.MyThemes.click();
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  public async clickOnAddThemes(): Promise<void> {
    await elementIsPresent(() => this.AddNewTheme);
    await this.AddNewTheme.click();
    await elementIsPresent(() => this.LeftSideBarButton);
    await elementIsPresent(() => this.Canvas);
  }

  public async clickOnAddText(): Promise<void> {
    await elementIsPresent(() => this.AddText);
    await this.AddText.click();
  }

  public async addBlankPage(): Promise<void> {
    if (!await this.LeftSidebar.isDisplayed()) {
      await this.LeftSideBarButton.click();
    }
    await elementIsPresent(() => this.LeftSidebar);
    await this.AddPageButton.click();
    await elementIsPresent(() => this.BlankPage);
    await this.BlankPage.click();
    await elementIsPresent(() => this.AddedPage);
  }

  public async addExistingMasterPage(): Promise<void> {
    if (!await this.LeftSidebar.isDisplayed()) {
      await this.LeftSideBarButton.click();
    }
    await elementIsPresent(() => this.LeftSidebar);
    await this.AddPageButton.click();
    await elementIsPresent(() => this.MasterPage1);
    await this.MasterPage1.click();
    await elementIsPresent(() => this.AddedPage);
  }

  public async clickOnThemesMenu(): Promise<void> {
    await elementIsPresent(() => this.ThemeMenu);
    await this.ThemeMenu.click();
  }

  public async getShadowRoot(): Promise<WebElement> {
    // we need this because sometimes the shadow dom is not loaded
    await this.browser.sleep(1000);
    await elementIsPresent(() => this.Canvas);
    await elementIsPresent(() => this.ShadowRootParent);
    await this.browser.getDriver().wait(until.elementIsVisible(this.ShadowRootParent.getElement()));
    const shadowRootParent: WebElement = await this
      .browser
      .getDriver()
      .executeScript('return document.querySelector("div .canvas-container .pe-editor-canvas")');

    const displayed: boolean = await shadowRootParent.isDisplayed();
    if (!displayed) {
      // tslint:disable-next-line:no-console
      console.log('waiting on shadow root');
      await this.browser.sleep(5000);
    }

    return this
      .browser
      .getDriver()
      .executeScript('return document.querySelector("div .canvas-container .pe-editor-canvas").shadowRoot');
  }

  public async getSectionsNumber(): Promise<number> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const sections: WebElement[] = await shadowRoot.findElements(By.css(shadowRootLocators.SECTIONS));

    return sections.length;
  }

  public async getTextValue(nthElement: number): Promise<string> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElement[] = await shadowRoot.findElements(By.css(shadowRootLocators.TEXT_OBJECT));

    return text[nthElement - 1].getText();
  }

  public async getLinkValue(): Promise<string> {
    await elementIsPresent(() => this.LinkToInput);

    return this.LinkToInput.getText();
  }


  public async getObject(locator: shadowRootLocators): Promise<WebComponent> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(locator, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, locator);
    await elementIsPresent(() => textComponent);

    return textComponent;
  }

  public async getAllObjects(locator: shadowRootLocators): Promise<WebElement[]> {
    const shadowRoot: WebElement = await this.getShadowRoot();

    return this.browser.findAllByCss(locator, shadowRoot);
  }

  public async getObjectUsingQuerySelector(locator: shadowRootLocators): Promise<WebComponent> {
    return this
      .browser
      .getDriver()
      .executeScript('return document.querySelector("div .canvas-container .pe-editor-canvas").shadowRoot.querySelector(arguments[0])', locator);
  }


  public async getProductAttribute(attribute: string): Promise<any> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(shadowRootLocators.PRODUCT, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, shadowRootLocators.PRODUCT);
    await elementIsPresent(() => textComponent);

    return textComponent.getAttributeValue(attribute);
  }

  public async getTextObjectAttribute(attribute: string): Promise<any> {
    const textComponent: WebComponent = await this.getObject(shadowRootLocators.TEXT_OBJECT_WRAPPER);

    return textComponent.getAttributeValue(attribute);
  }

  public async getObjectAttribute(locator: shadowRootLocators, attribute: string): Promise<any> {
    const component: WebComponent = await this.getObject(locator);

    return component.getAttributeValue(attribute);
  }

  public async getObjectStyle(style: string, locator: shadowRootLocators): Promise<string> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(locator, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, locator);
    await elementIsPresent(() => textComponent);

    return textComponent.getStyle(style);
  }

  public async deleteTextObject(): Promise<void> {
    const textComponent: WebComponent = await this.getObject(shadowRootLocators.TEXT_OBJECT);

    await textComponent.click();
    await this.DeleteButton.click();
  }

  public async clickDeleteButton(): Promise<void> {
    await elementIsPresent(() => this.DeleteButton);
    await this.DeleteButton.click();
  }

  public async clickTextObject(): Promise<void> {
    const textComponent: WebComponent = await this.getObject(shadowRootLocators.TEXT_OBJECT);

    await textComponent.click();
    await this.browser.findByCss("body").sendKeys(' ');
  }

  public async changeFontForText(): Promise<void> {
    await this.clickTextObject();
    await this.FontsDropdown.click();
    await this.OpenSansOption.click();
    await this.Canvas.click();
  }


  public async addNewProduct(): Promise<void> {
    await elementIsPresent(() => this.ProductButton);
    await this.ProductButton.click();
  }

  public async setTextValue(newValue: string): Promise<void> {
    const textComponent: WebComponent = await this.getObject(shadowRootLocators.TEXT_OBJECT);

    await textComponent.click();
    await this.browser.findByCss("body").sendKeys(newValue);
    await this.Canvas.click();
  }

  public async clickOnEditMasterPage(): Promise<void> {
    await elementIsPresent(() => this.EditMasterPage);
    await this.EditMasterPage.click();
  }

  public async clickOnAddPageButton(): Promise<void> {
    await elementIsPresent(() => this.AddPageButton);
    await this.AddPageButton.click();
  }

  public async clickOnRightSideBar(): Promise<void> {
    await elementIsPresent(() => this.RightSideBar);
    await this.RightSideBar.click();
  }

  public async clickOnEditTheme(): Promise<void> {
    await elementIsPresent(() => this.ThemesDots);
    await this.ThemesDots.click();
    await elementIsPresent(() => this.EditTheme);
    await this.EditTheme.click();
  }

  public async clickOnAddSection(): Promise<void> {
    await elementIsPresent(() => this.AddSectionButton);
    await this.AddSectionButton.click();
  }

  public async clickOnPublish(): Promise<void> {
    await elementIsPresent(() => this.Publish);
    await this.Publish.click();
  }

  public async setVersionName(newValue: string): Promise<void> {
    await elementIsPresent(() => this.VersionInput);
    // sometimes the component rerenders and selenium clicks on version input
    // but the component renders and switches back to the first input
    await this.browser.sleep(2000);
    await this.VersionInput.click();
    await this.VersionInput.sendKeys(newValue);
  }

  public async clickOnCreate(): Promise<void> {
    await elementIsPresent(() => this.Create);
    await this.Create.click();
  }

  public async clickOnVersionActions(): Promise<void> {
    await elementIsPresent(() => this.VersionActions);
    await this.VersionActions.click();
  }

  public async clickOnPublishVersion(): Promise<void> {
    await elementIsPresent(() => this.PublishVersion);
    await this.PublishVersion.click();
  }

  public async clickOnVersionName(): Promise<void> {
    await elementIsPresent(() => this.VersionName);
    await this.VersionName.click();
  }

  public async clickOnObjects(): Promise<void> {
    await elementIsPresent(() => this.Objects);
    await this.Objects.click();
  }

  public async clickOnShapes(): Promise<void> {
    await elementIsPresent(() => this.ShapesMenuItem);
    await this.ShapesMenuItem.click();
  }

  public async clickOnLine(): Promise<void> {
    await elementIsPresent(() => this.Line);
    await this.Line.click();
  }

  public async clickOnColorPicker(): Promise<void> {
    await elementIsPresent(() => this.ColorPicker);
    const textComponent: WebComponent = await this.getObject(shadowRootLocators.TEXT_OBJECT_WRAPPER);

    const driver: WebDriver = this.browser.getDriver();
    await driver.actions().doubleClick(textComponent.getElement()).perform();
    await driver.actions().doubleClick(textComponent.getElement()).perform();
    await this.ColorPicker.click();
  }

  public async clickOnDropdownWithControlKey(): Promise<void> {
    const circle: WebComponent = await this.getObject(shadowRootLocators.DROPDOWN);
    const driver: WebDriver = this.browser.getDriver();
    await driver.actions().keyDown(Key.COMMAND).click(circle.getElement()).keyUp(Key.COMMAND).perform();
  }

  public async changeColor(): Promise<void> {
    await elementIsPresent(() => this.ColorInput);
    await this.ColorInput.click();
    for (let i: number = 0; i < 6; i++) {
      await this.ColorInput.sendKeys(Key.BACK_SPACE);
      // sometimes it types too fast and some chars are not written
      await this.browser.sleep(100);
    }
    const newColor: string = '987';
    for (let i: number = 0; i < newColor.length; i++) {
      await this.ColorInput.sendKeys(newColor.charAt(i));
      // sometimes it types too fast and some chars are not written
      await this.browser.sleep(100);
    }
  }

  public async clickOnCanvas(): Promise<void> {
    await elementIsPresent(() => this.Canvas);
    await this.Canvas.click();
  }

  public async getFirstVersion(): Promise<string> {
    await elementIsPresent(() => this.FirstVersion);

    return this.FirstVersion.getText();
  }

  public async clickOnCircle(): Promise<void> {
    await elementIsPresent(() => this.Circle);
    await this.Circle.click();
  }

  public async getShapeAttribute(attribute: string): Promise<any> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(shadowRootLocators.CIRCLE, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, shadowRootLocators.CIRCLE);
    await elementIsPresent(() => textComponent);

    return textComponent.getAttributeValue(attribute);
  }

  public async getLineAttribute(attribute: string): Promise<any> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(shadowRootLocators.LINE, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, shadowRootLocators.LINE);
    await elementIsPresent(() => textComponent);

    return textComponent.getAttributeValue(attribute);
  }

  public async clickOnButtons(): Promise<void> {
    await elementIsPresent(() => this.Buttons);
    await this.Buttons.click();
  }

  public async clickOnButtonWidget(): Promise<void> {
    await elementIsPresent(() => this.ButtonWidget);
    await this.ButtonWidget.click();
  }

  public async clickOnRightArrowMenu(): Promise<void> {
    elementIsPresent(() => this.rightArrowMenu);
    await this.rightArrowMenu.click();
  }

  public async getButtonAttribute(attribute: string): Promise<any> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(shadowRootLocators.BUTTON, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, shadowRootLocators.BUTTON);
    await elementIsPresent(() => textComponent);

    return textComponent.getAttributeValue(attribute);
  }

  public async clickOnDropDown(): Promise<void> {
    elementIsPresent(() => this.DropDown);
    await this.DropDown.click();
  }

  public async clickOnDropDownWidget(): Promise<void> {
    elementIsPresent(() => this.DropDownWidget);
    await this.DropDownWidget.click();
  }

  public async clickOnCart(): Promise<void> {
    elementIsPresent(() => this.Cart);
    await this.Cart.click();
  }

  public async clickOnCartWidget(): Promise<void> {
    elementIsPresent(() => this.CartWidget);
    await this.CartWidget.click();
  }

  public async moveComponent(component: WebComponent): Promise<void> {
    const driver: WebDriver = this.browser.getDriver();
    await driver.actions()
      .move({ origin: component.getElement() })
      .press()
      .move({
        duration: 1000,
        x: 700,
        y: 250,
      })
      .perform();
  }

  public getPositionFromString(position: string): { top: string, left: string } {
    let top: string = '0px';
    let left: string = '0px';

    position.split(';').forEach((value: string) => {
      if (value.trim().startsWith('top')) {
        const topArray: string[] = value.split(":");
        top = topArray[1].trim();
      }

      if (value.trim().startsWith('left')) {
        const topArray: string[] = value.split(":");
        left = topArray[1].trim();
      }
    });

    return { top, left };
  }

  public async getTextPosition(): Promise<{ top: string, left: string }> {
    const style: string = await this.getTextObjectAttribute('style');

    return this.getPositionFromString(style);
  }

  public async getProductPosition(): Promise<{ top: string, left: string }> {
    const style: string = await this.getProductAttribute('style');

    return this.getPositionFromString(style);
  }

  public async getDropdownPosition(): Promise<{ top: string, left: string }> {
    const style: string = await this.getDropDownAttribute('style');

    return this.getPositionFromString(style);
  }

  public async getObjectPosition(locator: shadowRootLocators): Promise<{ top: string, left: string }> {
    const style: string = await this.getObjectAttribute(locator, 'style');

    return this.getPositionFromString(style);
  }

  public async getCartAttribute(attribute: string): Promise<any> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(shadowRootLocators.CART, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, shadowRootLocators.CART);
    await elementIsPresent(() => textComponent);

    return textComponent.getAttributeValue(attribute);
  }

  public async clickOnLinkTo(): Promise<void> {
    elementIsPresent(() => this.LinkTo);
    await this.LinkTo.click();
  }

  public async setLinkTo(newValue: string): Promise<void> {
    await elementIsPresent(() => this.LinkToInput);
    await this.LinkToInput.click();
    await this.LinkToInput.sendKeys(newValue);
  }

  public async getDropDownAttribute(attribute: string): Promise<any> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(shadowRootLocators.DROPDOWN, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, shadowRootLocators.DROPDOWN);
    await elementIsPresent(() => textComponent);

    return textComponent.getAttributeValue(attribute);
  }

  public async clickOnLinkToInput(): Promise<void> {
    elementIsPresent(() => this.LinkToInput);
    await this.LinkToInput.click();
  }

  public async clickCopyButton(): Promise<void> {
    elementIsPresent(() => this.CopyButton);
    await this.CopyButton.click();
  }

  public async clickPasteButton(): Promise<void> {
    elementIsPresent(() => this.PasteButton);
    await this.PasteButton.click();
  }

  public async clickSeoIcon(): Promise<void> {
    elementIsPresent(() => this.SeoIcon);
    await this.SeoIcon.click();
  }

  public async setPageTitleInput(newValue: string): Promise<void> {
    await elementIsPresent(() => this.PageTitle);
    await this.browser.sleep(2000);
    await this.PageTitle.click();
    for (let i: number = 0; i < 5; i++) {
      await this.PageTitle.sendKeys(Key.BACK_SPACE);
      // sometimes it types too fast and some chars are not written
      await this.browser.sleep(100);
    }
    await this.PageTitle.sendKeys(newValue);
  }

  public async clickOnShowInSearch(): Promise<void> {
    elementIsPresent(() => this.ShowInSearch);
    await this.ShowInSearch.click();
  }

  public async getPageNameValue(): Promise<string> {
    await elementIsPresent(() => this.PageName);

    return this.PageName.getText();
  }

  public async clickOnPageTitle(): Promise<void> {
    elementIsPresent(() => this.PageTitle);
    await this.PageTitle.click();
  }

  public async setUrlInput(newValue: string): Promise<void> {
    await elementIsPresent(() => this.UrlInput);
    await this.UrlInput.sendKeys(newValue);
  }

  public async clickOnUrlInput(): Promise<void> {
    await elementIsPresent(() => this.UrlInput);
    await this.UrlInput.click();
  }

  public async getUrlInputValue(): Promise<string> {
    await elementIsPresent(() => this.UrlInput);

    return this.UrlInput.getText();
  }

  public async clickOnMedia(): Promise<void> {
    elementIsPresent(() => this.Media);
    await this.Media.click();
  }

  public async getMediaAttribute(attribute: string): Promise<any> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(shadowRootLocators.MEDIA, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, shadowRootLocators.MEDIA);
    await elementIsPresent(() => textComponent);

    return textComponent.getAttributeValue(attribute);
  }

  public async clickOnReplace(): Promise<void> {
    elementIsPresent(() => this.Replace);
    await this.Replace.click();
  }

  public async clickOnSave(): Promise<void> {
    elementIsPresent(() => this.Save);
    await this.Save.click();
  }

  public async clickOnPicture(): Promise<void> {
    elementIsPresent(() => this.Picture);
    await this.Picture.click();
  }

  public async clickOnCarousel(): Promise<void> {
    elementIsPresent(() => this.Carousel);
    await this.Carousel.click();
  }

  public async getCarouselAttribute(attribute: string): Promise<any> {
    const shadowRoot: WebElement = await this.getShadowRoot();
    const text: WebElementPromise = this.browser.findByCss(shadowRootLocators.CAROUSEL, shadowRoot);
    const textComponent: WebComponent = new WebComponent(text, shadowRootLocators.CAROUSEL);
    await elementIsPresent(() => textComponent);

    return textComponent.getAttributeValue(attribute);
  }

  public async clickOnImagesDropDown(): Promise<void> {
    elementIsPresent(() => this.Images);
    await this.Images.click();
  }

  public async clickOnCloseIcon(): Promise<void> {
    elementIsPresent(() => this.CloseIcon);
    await this.CloseIcon.click();
  }

  public async doubleClickOnObject(locator: shadowRootLocators): Promise<void> {
    const object: WebComponent = await this.getObject(locator);
    await this.browser.getDriver().actions().doubleClick(object.getElement()).perform();
  }

  public async clickOnObject(locator: shadowRootLocators): Promise<void> {
    const object: WebComponent = await this.getObject(locator);
    await this.browser.getDriver().actions().click(object.getElement()).perform();
  }

  public async clickOnProductActions(): Promise<void> {
    elementIsPresent(() => this.ProductActions);
    await this.ProductActions.click();
  }

  public async setText(newValue: string): Promise<void> {
    for (let i: number = 0; i < 4; i++) {
      this.browser.getDriver().actions().sendKeys(Key.BACK_SPACE).perform();
      await this.browser.sleep(100);
    }
    this.browser.getDriver().actions().sendKeys(newValue).perform();
  }

  public async changeFontSizeForText(): Promise<void> {
    await this.clickTextObject();
    await this.ArrowUp.click();
    await this.ArrowUp.click();
    await this.Canvas.click();
  }

  public async changeFontBoldForText(): Promise<void> {
    const textComponent: WebComponent = await this.getObject(shadowRootLocators.TEXT_OBJECT);

    await elementIsPresent(() => textComponent);
    await textComponent.click();
    await this.browser.findByCss("body").sendKeys(' newtext');
    await elementIsPresent(() => this.BoldIcon);
    await this.doubleClickOnObject(shadowRootLocators.TEXT_OBJECT);
    await this.BoldIcon.click();
    await this.Canvas.click();
  }

  public async clickOnWidthArrowUp(): Promise<void> {
    elementIsPresent(() => this.WidthArrowUp);
    await this.WidthArrowUp.click();
  }

  public async clickOnCustomSelection(): Promise<void> {
    elementIsPresent(() => this.CustomSelection);
    await this.CustomSelection.click();
  }

  public async clickOnAllProducts(): Promise<void> {
    elementIsPresent(() => this.AllProducts);
    await this.AllProducts.click();
  }

  public async clickOnHeightArrowUp(): Promise<void> {
    elementIsPresent(() => this.HeightArrowUp);
    await this.HeightArrowUp.click();
  }

  public async clickOnShadowDropDown(): Promise<void> {
    elementIsPresent(() => this.Shadow);
    await this.Shadow.click();
  }

  public async clickOnDropShadow(): Promise<void> {
    elementIsPresent(() => this.DropShadow);
    await this.DropShadow.click();
  }

  public async clickOnBlurArrowUp(): Promise<void> {
    elementIsPresent(() => this.BlurArrowUp);
    await this.BlurArrowUp.click();
  }

  public async clickOnOffsetArrowUp(): Promise<void> {
    elementIsPresent(() => this.OffsetArrowUp);
    await this.OffsetArrowUp.click();
  }

  public async clickOnOpacityArrowDown(): Promise<void> {
    elementIsPresent(() => this.OpacityArrowDown);
    await this.OpacityArrowDown.click();
  }

  public async clickOnOpacityArrowDown2(): Promise<void> {
    elementIsPresent(() => this.OpacityArrowDown2);
    await this.OpacityArrowDown2.click();
  }

  public async clickOnSettings(): Promise<void> {
    elementIsPresent(() => this.Settings);
    await this.Settings.click();
  }

  public async clickOnLiveStatusThumb(): Promise<void> {
    elementIsPresent(() => this.LiveStatusThumb);
    await this.LiveStatusThumb.click();
  }

  public async resizeElement(x: number = 400, y: number = 500): Promise<void> {
    await this.browser.sleep(2000);
    let topRightCircle: WebElement | undefined;
    const elements: WebElement[] = await this.getAllObjects(shadowRootLocators.CIRCLES);
    const circles: any = await Promise.all(elements.map(async (element: WebElement) => {
      const circleCorner: string | null = await element.getAttribute('editor-control-type');

      return { element: element, circleCorner };
    }));

    circles.forEach((value: any) => {
      if (value.circleCorner === 'top-right') {
        topRightCircle = value.element;
      }
    });

    await this.browser.getDriver().actions()
      .move({ origin: topRightCircle })
      .press()
      .move({ duration: 1000, x, y })
      .release()
      .perform();
  }

  public async hoverObject(locator: shadowRootLocators): Promise<void> {
    const object: WebComponent = await this.getObject(locator);
    await this.browser.getDriver().actions().move({ origin: object.getElement() }).perform();
  }

  public async clickOnEditDomain(): Promise<void> {
    elementIsPresent(() => this.EditDomainName);
    await this.EditDomainName.click();
  }

  public async setDomainName(newValue: string): Promise<void> {
    await elementIsPresent(() => this.DomainNameInput);
    await this.DomainNameInput.click();
    await this.DomainNameInput.sendKeys(newValue);
  }

  public async clickOnDone(): Promise<void> {
    elementIsPresent(() => this.DoneButton);
    await this.DoneButton.click();
  }

  public async getDomainNameValue(): Promise<string> {
    await elementIsPresent(() => this.DomainNameInput);

    return this.DomainNameInput.getText();
  }

  public async clickOnShadowColorButton(): Promise<void> {
    elementIsPresent(() => this.ShadowColor);
    await this.ShadowColor.click();
  }

  public async clickOnHover(): Promise<void> {
    elementIsPresent(() => this.Hover);
    await this.Hover.click();
  }

  public async clickHeaderArea(): Promise<void> {
    elementIsPresent(() => this.HeaderArea);
    await this.HeaderArea.click();
  }

  public async clickAddBlank(): Promise<void> {
    elementIsPresent(() => this.AddBlank);
    await this.AddBlank.click();
  }

  public async clickScreen(): Promise<void> {
    elementIsPresent(() => this.Screen);
    await this.Screen.click();
  }

  public async clickDesktopScreen(): Promise<void> {
    elementIsPresent(() => this.DesktopScreen);
    await this.DesktopScreen.click();
  }
}

