import { Button } from './button';
import { WebComponentEnsurer } from './ensure';

export class ButtonEnsurer extends WebComponentEnsurer {
  protected button: Button;
  constructor(button: Button) {
    super(button);
    this.button = button;
  }

  public async isNotDisabled(): Promise<void|never> {
    if (await this.button.isDisabled()) {
      throw new Error(`Button ${this.button.selector} is disabled`);
    }
  }
}
