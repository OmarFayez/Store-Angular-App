import { Component, DestroyRef, inject } from '@angular/core';
import { ProductsStoreService } from '../../data-access/products-store.service';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { Product } from '../../utils/product.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ConfirmationDialogService } from 'src/app/shared/feature/confirmation-dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import {
  ModalHeight,
  ModalPercentageSize,
} from 'src/app/shared/utils/enum/modal-size-enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminDashboardComponent {
  constructor(
    private productsStoreService: ProductsStoreService,
    private confirmService: ConfirmationDialogService,
    private readonly translateService: TranslateService,
    private readonly dialog: MatDialog
  ) {}
  private destroyRef = inject(DestroyRef);

  adminProducts$: Observable<Product[]> =
    this.productsStoreService.adminProducts$;

  public addProduct = (): void => {
    this.dialog
      .open(AddEditProductComponent, {
        width: ModalPercentageSize.X_LARGE,
        height: ModalHeight.X_LARGE,
        hasBackdrop: true,
        disableClose: true,
        closeOnNavigation: true,
        restoreFocus: false,
      })
      .afterClosed()
      .pipe(
        switchMap((product) => {
          if (!!product)
            return this.productsStoreService.addProductFromApi(
              product as Product
            );
          else return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  };

  public updateProduct(prod: Product): void {
    this.dialog
      .open(AddEditProductComponent, {
        width: ModalPercentageSize.X_LARGE,
        height: ModalHeight.X_LARGE,
        hasBackdrop: true,
        disableClose: true,
        closeOnNavigation: true,
        restoreFocus: false,
        data: { prod },
      })
      .afterClosed()
      .pipe(
        switchMap((product) => {
          return this.productsStoreService.updateProductFromApi(
            product as Product
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  public deleteProduct(product: Product): void {
    this.confirmService
      .Confirm(
        `${
          this.translateService.instant('from') +
          ' ' +
          this.translateService.instant('delete')
        } (${product.title.split('').slice(0, 40).join('')}...) ?`,
        this.translateService.instant('sure'),
        this.translateService.instant('delete')
      )
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
        switchMap((val) => {
          if (val)
            return this.productsStoreService.deleteProductFromApi(product.id);
          else return of();
        })
      )
      .subscribe();
  }
  // deleteProduct(id: number) {
  //   this.productsStoreService.deleteProduct(id);
  // }
}
