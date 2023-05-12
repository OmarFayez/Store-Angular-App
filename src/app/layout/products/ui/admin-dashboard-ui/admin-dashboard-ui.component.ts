import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Product } from '../../utils/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-admin-dashboard-ui',
  templateUrl: './admin-dashboard-ui.component.html',
  styleUrls: ['./admin-dashboard-ui.component.scss'],
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
export class AdminDashboardUiComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.dataSource.filter = value?.trim().toLowerCase();
      });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onDeleteProduct = new EventEmitter<Product>();
  @Output() onAddProduct = new EventEmitter<void>();
  @Output() onUpdateProduct = new EventEmitter<Product>();

  @Input() set dataSource(data: any) {
    this._dataSource = new MatTableDataSource(data);
    this._dataSource.paginator = this.paginator;
  }
  get dataSource() {
    return this._dataSource;
  }

  private _dataSource = new MatTableDataSource([]);

  searchControl = new FormControl('');

  ngAfterViewInit() {
    this._dataSource.paginator = this.paginator;
  }

  columnsToDisplay = [];
  columnsToDisplayWithExpand = [
    'expand',
    'image',
    'title',
    'price',
    'category',
    'rating',
    'actions',
  ];
  expandedElement!: Product | null;

  public deleteProduct(product: Product) {
    this.onDeleteProduct.emit(product);
  }
  public addProduct() {
    this.onAddProduct.emit();
  }

  public updateProduct(product: Product) {
    this.onUpdateProduct.emit(product);
  }
}
