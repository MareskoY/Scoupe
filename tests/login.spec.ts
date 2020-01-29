import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { suite, test } from 'mocha-typescript';

import { AbstractTest } from '../common/abstract-test';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

@suite('Test Login functionality')
class LoginTest extends AbstractTest {
  @test('should login successfully with valid credentials')
  public async testSuccessLogin(): Promise<void> {
    await this.pages.login.signIn();
    expect(await this.pages.switchProfile.business.isDisplayed()).to.be.true;
  }

  @test('should not login with invalid credentials')
  public async testFailedLogin(): Promise<void> {
    await this.pages.login.signIn('some@invalid.email', 'wrongpassword');
    expect(await this.pages.login.Login.isDisplayed()).to.be.true;
  }
}
