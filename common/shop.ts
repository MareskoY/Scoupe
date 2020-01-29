import { Browser, elementIsPresent, findByXpath, Page, WebComponent } from '../lib';

import { environment } from '../environments/environment';

export enum ShopItems {
  SHOP = 'shop',
  POINT_OF_SALE = 'pos',
}

export class ShopPage extends Page {

  @findByXpath("(//div[@class='app-card-content'])[1]")
  private Container: WebComponent;

  @findByXpath("//div[@data-pe-app='%s']", ShopItems.SHOP)
  private ShopItem: WebComponent;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${environment.commerceosFrontendUrl}/info/apps`);
  }

  public loadCondition(): any {
    return elementIsPresent(() => this.Container);
  }

  public async select(shopItem: ShopItems): Promise<Browser> {
    await this.browser.setWaitTime(7000, 7000, 7000);
    switch (shopItem) {
      case ShopItems.SHOP:
        await elementIsPresent(() => this.ShopItem);
        await this.ShopItem.click();
    }

    return this.browser;
  }
}
