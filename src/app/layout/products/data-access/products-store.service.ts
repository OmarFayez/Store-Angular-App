import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  finalize,
  forkJoin,
  map,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { Product } from '../utils/product.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  constructor(
    private http: HttpClient,
    private toasterService: ToastrService,
    private readonly translateService: TranslateService
  ) {
    // this.categories$.pipe(takeUntilDestroyed()).subscribe();
    // this.products$.pipe(takeUntilDestroyed()).subscribe();
    forkJoin([this.categories$, this.products$])
      .pipe(
        takeUntilDestroyed(),
        finalize(() => {
          this.dataLoaded.next(true);
        }),
        catchError((err) => this.handleError(err))
      )
      .subscribe();
    this.mergedProductsWithCategories.pipe(takeUntilDestroyed()).subscribe();
  }
  private categories$: Observable<string[]> = this.http
    .get<string[]>('https://fakestoreapi.com/products/categories')
    .pipe(
      tap((categories) => this.allCategories.next(categories)),
      retry(2),
      catchError((err) => this.handleError(err))
    );
  private allCategories = new BehaviorSubject<string[]>([]);
  public allCategories$ = this.allCategories.asObservable();

  private products$: Observable<Product[]> = this.http
    .get<Product[]>('https://fakestoreapi.com/products')
    .pipe(
      tap((products) => {
        this.adminProducts.next(products);
        this.productsLength = products.length;
      }),
      retry(2),
      catchError((err) => this.handleError(err))
    );

  private dataLoaded = new BehaviorSubject<boolean>(false);
  public dataLoaded$ = this.dataLoaded.asObservable();

  // For Admin DashBoard Products
  private adminProducts = new BehaviorSubject<Product[]>([]);
  public adminProducts$ = this.adminProducts.asObservable();
  private productsLength = 0;

  // For user Products
  private filteredProducts = new BehaviorSubject<Product[]>([]);
  public filteredProducts$ = this.filteredProducts.asObservable();

  private selectedCategory = new BehaviorSubject('all');
  public selectedCategory$ = this.selectedCategory.asObservable();

  private mergedProductsWithCategories = combineLatest([
    this.adminProducts$,
    this.selectedCategory$,
  ]).pipe(
    map(([adminProducts, category]) => {
      if (category === 'all') return adminProducts;
      else {
        const newProducts = adminProducts?.filter(
          (product) => product.category === category
        );

        return newProducts;
      }
    }),
    tap((products) => {
      this.filteredProducts.next(products);
    }),
    catchError((err) => this.handleError(err))
  );

  public changeSelectedCategory(newCategory: string) {
    this.selectedCategory.next(newCategory);
  }
  public addProductFromApi(product: Product) {
    return this.http
      .post<Product>('https://fakestoreapi.com/products', product)
      .pipe(
        tap(() => {
          this.addProduct(product);
          this.toasterService.success(
            this.translateService.instant('createSuccess')
          );
        }),
        catchError((err) => {
          this.toasterService.error(
            this.translateService.instant('createFailed')
          );
          return this.handleError(err);
        })
      );
  }

  private addProduct(product: Product) {
    this.productsLength++;
    const newProduct = { ...product, id: this.productsLength };
    const adminProducts = [...this.adminProducts.getValue()];
    adminProducts?.unshift(newProduct);
    this.adminProducts.next(adminProducts);
  }

  public updateProductFromApi(product: Product) {
    return this.http
      .put<Product>(`https://fakestoreapi.com/products/${product.id}`, product)
      .pipe(
        tap(() => {
          this.updateProduct(product);
          this.toasterService.success(
            this.translateService.instant('updatedSuccess')
          );
        }),
        catchError((err) => {
          this.toasterService.error(
            this.translateService.instant('updatedFailed')
          );
          return this.handleError(err);
        })
      );
  }

  private updateProduct(product: Product) {
    let adminProducts = [...this.adminProducts.getValue()];
    const ProductIndex = adminProducts.findIndex(
      (oldProduct) => oldProduct.id === product.id
    );
    adminProducts[ProductIndex] = product;
    adminProducts = [...adminProducts];
    this.adminProducts.next(adminProducts);
  }

  public deleteProductFromApi(id: number) {
    return this.http.delete(`https://fakestoreapi.com/products/${id}`).pipe(
      tap(() => {
        this.deleteProduct(id);
        this.toasterService.success(
          this.translateService.instant('deleteSuccess')
        );
      }),
      catchError((err) => {
        this.toasterService.error(
          this.translateService.instant('deleteFailed')
        );
        return this.handleError(err);
      })
    );
  }
  private deleteProduct(id: number) {
    const adminProducts = this.adminProducts.getValue();
    const newAdminProducts = adminProducts?.filter(
      (product) => product.id !== id
    );
    this.adminProducts.next(newAdminProducts);
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
