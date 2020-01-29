import {
  Browser,
  Button,
  elementIsPresent,
  findByXpath,
  Page,
  TextInput,
  WaitCondition,
  WebComponent,
} from '../../lib';
import { environment } from '../../environments/environment';
import { By } from "selenium-webdriver";

export class LoginPage extends Page {
  @findByXpath("//input[@name='UserName']")
  public Email: TextInput;

  @findByXpath("//input[@placeholder='Password']")
  public Password: TextInput;

  @findByXpath("//button[@type='submit']")
  public Login: Button;

  @findByXpath("//img[@class='logo-header']")
  private LoginLogo: WebComponent;

  constructor(browser: Browser) {
    super(browser);
    this.setUrl(environment.commerceosFrontendUrl + '/entry/login');
  }

  public loadCondition(): WaitCondition {
    return elementIsPresent(() => this.Email);
  }

  public async signIn(
    email: string = environment.defaultUserEmail,
    password: string = environment.defaultUserPass,
  ): Promise<void> {
    await this.navigate();
    await this.Email.type(email);
    await this.Password.type(password);
    await this.Login.click();
  }
}
