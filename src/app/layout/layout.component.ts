import { Component } from '@angular/core';
import { ProductsStoreService } from './products/data-access/products-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private productsStoreService: ProductsStoreService) {}
  public dataLoaded$ = this.productsStoreService.dataLoaded$;
}
