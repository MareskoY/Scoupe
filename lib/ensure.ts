import { WebComponent, Button, TextInput, ButtonEnsurer, TextInputEnsurer } from './';

export class WebComponentEnsurer {
  constructor(private component: WebComponent) {
  }

  public async textIs(expected: string): Promise<void|never> {
    const text: string = await this.component.getText();

    if (expected.trim() !== text.trim()) {
      throw new Error(`Element ${this.component.selector} text is '${text}'. Expected value is '${expected}'`);
    }
  }

  public async isVisible(): Promise<void|never> {
    if (!await this.component.isDisplayed()) {
      throw new Error(`Element ${this.component.selector} is visible`);
    }
  }

  public async isNotVisible(): Promise<void|never> {
    if (await this.component.isDisplayed()) {
      throw new Error(`Element ${this.component.selector} is visible`);
    }
  }
}

export function ensure(component: Button): ButtonEnsurer;
export function ensure(component: TextInput): TextInputEnsurer;
export function ensure(component: WebComponent): WebComponentEnsurer;
export function ensure(component: WebComponent | Button): any {
    if (component instanceof Button) {
        return new ButtonEnsurer(component);
    } else {
        return new WebComponentEnsurer(component);
    }
}
