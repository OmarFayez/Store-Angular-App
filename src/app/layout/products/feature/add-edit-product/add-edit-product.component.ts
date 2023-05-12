import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BidirectionallyService } from 'src/app/core/services/bidirectionally.service';
import { Product } from '../../utils/product.model';
import { IAddEditProductFormGroup } from '../../utils/add-edit-product-form-group.interface';
import { ProductsStoreService } from '../../data-access/products-store.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  public constructor(
    private readonly _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      prod: Product;
    },
    public readonly _dialogRef: MatDialogRef<AddEditProductComponent>,
    private readonly _direction: BidirectionallyService,
    private readonly _translateService: TranslateService,
    private productStoreService: ProductsStoreService
  ) {}
  destroyRef = inject(DestroyRef);

  public addEditProductForm: FormGroup<IAddEditProductFormGroup> =
    this._fb.group({
      title: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: Validators.required,
      }),
      rate: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.max(5)],
      }),
      count: new FormControl<number | null>(10, {
        nonNullable: true,
        validators: Validators.required,
      }),
      price: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      category: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: Validators.required,
      }),
      description: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: Validators.required,
      }),
      image: new FormControl<string | null>(null, {
        nonNullable: true,
      }),
    });

  public allCategories$: Observable<string[]> =
    this.productStoreService.allCategories$;

  public readonly dir$ = this._direction.direction$;

  public submitLoading = false;

  public get modalTitle(): string {
    return this._translateService.instant(
      !!this.data?.prod ? 'edit' : 'create'
    );
  }

  public ngOnInit(): void {
    if (!!this.data?.prod) {
      this.addEditProductForm.patchValue({
        ...this.data?.prod,
        rate: this.data?.prod.rating.rate,
        count: this.data?.prod.rating.count,
      });
    }
  }

  public onSubmit(): void {
    this.submitLoading = true;
    !!this.data?.prod ? this.updateProduct() : this.createNewProduct();
  }

  private createNewProduct(): void {
    const product = {
      ...this.addEditProductForm?.value,
      rating: {
        rate: this.addEditProductForm?.value.rate,
        count: this.addEditProductForm?.value.count,
      },
    };
    this.submitLoading = false;
    this.cancelHandler(product);
  }

  private updateProduct(): void {
    const product = {
      id: this.data?.prod?.id,
      ...this.addEditProductForm?.value,
      rating: {
        rate: this.addEditProductForm?.value.rate,
        count: this.data?.prod.rating.count,
      },
    };
    this.submitLoading = false;
    this.cancelHandler(product);
  }

  public cancelHandler = (res?: unknown): void =>
    this._dialogRef.close(res ?? null);
}
