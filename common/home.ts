import { Browser, Button, elementIsPresent, findByXpath, Page } from '../lib';

import { environment } from '../environments/environment';

export class HomePage extends Page {

  @findByXpath("(//span[contains(@class, 'mat-toolbar-link-text')])[2]")
  private Apps: Button;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.commerceosFrontendUrl);
  }

  public loadCondition(): any {
    return elementIsPresent(() => this.Apps);
  }

  public async clickOnApps(): Promise<Browser> {
    await this.browser.setWaitTime(10000, 10000, 10000);
    await elementIsPresent(() => this.Apps);
    await this.Apps.click();

    return this.browser;
  }
}
