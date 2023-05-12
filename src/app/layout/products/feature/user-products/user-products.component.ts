import { Component } from '@angular/core';
import { ProductsStoreService } from '../../data-access/products-store.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent {
  constructor(private productsStoreService: ProductsStoreService) {}

  public allCategories$ = this.productsStoreService.allCategories$;
  public filteredProducts$ = this.productsStoreService.filteredProducts$;
  public dataLoaded$ = this.productsStoreService.dataLoaded$;

  public selectCategory(category: any) {
    this.productsStoreService.changeSelectedCategory(category);
    console.log(category);
  }

  public addProduct() {
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
    // this.productsStoreService.addProduct(newProduct);
  }
}
