import 'chromedriver';
import {
  Builder,
  By,
  Capabilities,
  logging,
  ThenableWebDriver,
  WebElement,
  WebElementPromise
} from 'selenium-webdriver';

import { WaitCondition } from './';
import { Options } from "selenium-webdriver/chrome";
import Preferences = logging.Preferences;

export class Browser {
  private readonly driver: ThenableWebDriver;

  public constructor() {
    const options: Options = new Options();
    options.addArguments('--incognito');

    const pref: Preferences = new logging.Preferences();
    pref.setLevel('browser', logging.Level.ALL);
    pref.setLevel('driver', logging.Level.ALL);
    const capabilities: Capabilities = Capabilities.chrome().setLoggingPrefs(pref);

    this.driver = new Builder().setChromeOptions(options).withCapabilities(capabilities).build();
  }

  public async navigate(url: string): Promise<void> {
    await this.driver.navigate().to(url);
  }

  public findElement(selector: string): WebElementPromise {
    return this.driver.findElement(By.css(selector));
  }

  public async sleep(time: number): Promise<void> {
    await this.driver.sleep(time);
  }

  public findByXpath(selector: string, shadowRoot: WebElement | null = null): WebElementPromise {
    return shadowRoot
      ? shadowRoot.findElement(By.xpath(selector))
      : this.driver.findElement(By.xpath(selector));
  }

  public findByCss(selector: string, shadowRoot: WebElement | null = null): WebElementPromise {
    return shadowRoot
    ? shadowRoot.findElement(By.css(selector))
    : this.driver.findElement(By.css(selector));
  }

  public findAllByCss(selector: string, shadowRoot: WebElement | null = null): Promise<WebElement[]> {
    return shadowRoot
      ? shadowRoot.findElements(By.css(selector))
      : this.driver.findElements(By.css(selector));
  }

  public getDriver(): ThenableWebDriver {
    return this.driver;
  }

  public async setWaitTime(implicit?: number, pageLoad?: number, script?: number): Promise<void> {
    await this.driver.manage().setTimeouts({
      implicit,
      pageLoad,
      script,
    });
  }

  public async clearCookies(): Promise<void> {
    await this.driver.manage().deleteAllCookies();
  }

  public async wait(condition: WaitCondition): Promise<void> {
    await this.waitAny(condition);
  }

  public async waitAny(conditions: WaitCondition | WaitCondition[]): Promise<void> {
    const all: WaitCondition[] = (!(conditions instanceof Array)) ? [conditions] : conditions;

    await this.driver.wait(async () => {
      for (const condition of all) {
        try {
          if (await condition(this)) {
            return true;
          }
        } catch (ex) {
          // silent?
        }
      }
    });
  }

  public async close(): Promise<void> {
    await this.driver.quit();
  }
}
