import {
  Browser,
  Button,
  elementIsPresent,
  findByXpath,
  Page,
  pageHasLoaded,
  TextInput,
} from '../lib';
import { SwitcherProfilePage } from '../tests/pages';

import { environment } from '../environments/environment';

export class LoginPage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.commerceosFrontendUrl + '/entry/login');
  }

  @findByXpath("//input[@name='UserName']")
  public Email: TextInput;

  @findByXpath("//input[@placeholder='Password']")
  public Password: TextInput;

  @findByXpath("//button[@type='submit']")
  public Login: Button;

  public loadCondition() {
    return elementIsPresent(() => this.Email);
  }

  public async signIn(
    email: string = environment.defaultUserEmail,
    password: string = environment.defaultUserPass,
  ): Promise<Browser> {
    await this.browser.setWaitTime(10000, 10000, 10000);
    await this.navigate();
    await elementIsPresent(() => this.Email);
    await this.Email.type(email);
    await elementIsPresent(() => this.Password);
    await this.Password.type(password);
    await elementIsPresent(() => this.Login);
    await this.Login.click();
    await this.browser.wait(pageHasLoaded(SwitcherProfilePage));

    return this.browser;
  }
}
