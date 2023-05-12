import { Component } from '@angular/core';
import { ProductsStoreService } from '../../data-access/products-store.service';
import { Observable, switchMap, take, tap } from 'rxjs';
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
    private readonly translateService: TranslateService
  ) {}
  adminProducts$: Observable<Product[]> =
    this.productsStoreService.adminProducts$;
  addProduct() {
    const newProduct = {
      id: 21,
      title: 'Omaradada - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Youassssssssssrest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: {
        rate: 3.9,
        count: 120,
      },
    };
    this.productsStoreService.addProduct(newProduct);
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
        switchMap(() =>
          this.productsStoreService.deleteProductFromApi(product.id)
        )
      )
      .subscribe();
  }
  // deleteProduct(id: number) {
  //   this.productsStoreService.deleteProduct(id);
  // }
}
