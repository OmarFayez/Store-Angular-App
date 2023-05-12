import { FormControl } from '@angular/forms';

export interface IAddEditProductFormGroup {
  title: FormControl<string | null>;
  rate: FormControl<number | null>;
  count: FormControl<number | null>;
  price: FormControl<number | null>;
  description: FormControl<string | null>;
  image: FormControl<string | null>;
  category: FormControl<string | null>;
}
