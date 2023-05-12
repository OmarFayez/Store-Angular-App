import { Component, OnDestroy } from '@angular/core';
import { ProductsStoreService } from '../../data-access/products-store.service';
import { Animations } from 'src/app/shared/utils/animations/animations';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
  animations: [Animations],
})
export class UserProductsComponent implements OnDestroy {
  constructor(private productsStoreService: ProductsStoreService) {}

  public allCategories$ = this.productsStoreService.allCategories$;
  public filteredProducts$ = this.productsStoreService.filteredProducts$;
  public dataLoaded$ = this.productsStoreService.dataLoaded$;
  public selectedCategory: string = 'all';
  public selectCategory(category: string) {
    this.selectedCategory = category;
    this.productsStoreService.changeSelectedCategory(category);
  }

  ngOnDestroy(): void {
    this.productsStoreService.changeSelectedCategory('all');
  }
}
