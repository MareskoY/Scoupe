import { WebComponent } from './web-component';

export class TextInput extends WebComponent {
  public async type(text: string): Promise<void> {
    console.log(`Sending keys: ${text} to ${this.selector}`);

    return this.element.sendKeys(text);
  }
}
