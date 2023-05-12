import {
  Component,
  EventEmitter,
  Input,
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
export class AdminDashboardUiComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onDeleteProduct = new EventEmitter<number>();
  @Output() onAddProduct = new EventEmitter<void>();

  @Input() set dataSource(data: any) {
    this._dataSource = new MatTableDataSource(data);
    this._dataSource.paginator = this.paginator;
  }
  get dataSource() {
    return this._dataSource;
  }

  private _dataSource = new MatTableDataSource([]);

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteProduct(id: number) {
    this.onDeleteProduct.emit(id);
  }
  public addProduct() {
    this.onAddProduct.emit();
  }
}
