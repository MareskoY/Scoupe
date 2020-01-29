import { WebElement, WebElementPromise } from 'selenium-webdriver';

export class WebComponent {
  constructor(protected element: WebElementPromise, public selector: string) { }

  public async click(): Promise<void> {
    console.log(`Click on ${this.selector}`);
    try {
      return await this.element.click();
    } catch (clickErr) {
      try {
        await this.element.getDriver().executeScript('arguments[0].click();', this.element);
      } catch (jsErr) {
        throw clickErr;
      }
    }
  }

  public getElement(): WebElement {
    return this.element;
  }

  public async sendKeys(keys: string): Promise<void> {
    console.log(`Sending keys: ${keys} to ${this.selector}`);

    return this.element.sendKeys(keys)
  }

  public async getStyle(style: string): Promise<string> {
    return this.element.getCssValue(style);
  }

  public async getAttributeValue(attribute: string): Promise<string> {
    return this.element.getAttribute(attribute);
  }

  public async isDisplayed(): Promise<boolean> {
    try {
      return await this.element.isDisplayed();
    } catch (ex) {
      return false;
    }
  }

  public async getText(): Promise<string> {
    return this.element.getText();
  }
}
