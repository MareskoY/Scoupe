import { Browser, WaitCondition } from './';

export type NewablePage<T extends Page> = new(browser: Browser) => T;

export abstract class Page {
  protected constructor(protected browser: Browser) {
  }

  private url: string;

  public async navigate(): Promise<void> {
    await this.browser.navigate(this.url);
    await this.browser.setWaitTime(10000, 10000, 10000);
    await this.browser.wait(this.loadCondition());
  }

  public abstract loadCondition(): WaitCondition;

  protected setUrl(url: string): void {
    this.url = url;
  }
}
