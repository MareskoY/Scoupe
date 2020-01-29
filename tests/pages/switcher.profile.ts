import {
  Browser,
  Button,
  elementIsPresent, elementIsVisible,
  findByXpath,
  Page,
  WaitCondition,
  WebComponent,
} from '../../lib';
import { environment } from '../../environments/environment';

export class SwitcherProfilePage extends Page {
  @findByXpath('//*[@class="profile-header" and text()="BUSINESS"]')
  public business: Button;

  @findByXpath('//*[@class="profile-header" and text()="PERSONAL"]')
  public personal: Button;

  @findByXpath('//*[@class="profile-header" and text()="BUSINESS"]/../div[2]/div')
  private Logo1: WebComponent;

  @findByXpath('(//*[contains(@class, \'logo-placeholder\')])[1]')
  private Logo2: WebComponent;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.commerceosFrontendUrl + 'switcher/profile');
  }

  public loadCondition(): WaitCondition {
    return elementIsPresent(() => this.business);
  }

  public async selectAccountPersonal(): Promise<Browser> {
    await this.personal.click();

    return this.browser;
  }

  public async clickOnLogo(): Promise<void> {
    await this.browser.setWaitTime(10000, 10000, 10000);
    await elementIsVisible(() => this.Logo1);
    const isFirstLogoDisplayed: boolean = await this.Logo1.isDisplayed();
    if (isFirstLogoDisplayed) {
      await this.Logo1.click();
    } else {
      await this.Logo2.click();
    }
  }

  public async selectAccountBusiness(): Promise<Browser> {
    await this.business.click();

    return this.browser;
  }
}
