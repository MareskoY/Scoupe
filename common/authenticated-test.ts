import { AbstractTest } from './abstract-test';

export class AuthenticatedTest extends AbstractTest {
  public async before(): Promise<void> {
    super.before();
    await this.pages.login.signIn();
  }
}
