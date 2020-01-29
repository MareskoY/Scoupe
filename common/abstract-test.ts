import { Browser } from '../lib';
import { AllPages } from './index';

export class AbstractTest {
  protected readonly browser: Browser = new Browser();
  protected readonly pages: AllPages = new AllPages(this.browser);

  public async before(): Promise<void> {
    await this.browser.setWaitTime(10000, 7000, 7000);
  }

  public async after(): Promise<void> {
    await this.browser.close();
  }
}
