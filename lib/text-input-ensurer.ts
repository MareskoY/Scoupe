import { TextInput } from './text-input';
import { Button } from './button';
import { WebComponentEnsurer } from './ensure';

export class TextInputEnsurer extends WebComponentEnsurer {
  constructor(element: TextInput) {
    super(element);
  }
}
