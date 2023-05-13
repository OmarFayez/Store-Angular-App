import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();
    this.translateLabels();
  }

  translateLabels() {
    this.translateService
      .get('paginator.itemsPerPageLabel')
      .subscribe((res: string) => {
        this.itemsPerPageLabel = res;
      });

    this.translateService
      .get('paginator.nextPageLabel')
      .subscribe((res: string) => {
        this.nextPageLabel = res;
      });

    this.translateService
      .get('paginator.previousPageLabel')
      .subscribe((res: string) => {
        this.previousPageLabel = res;
      });

    this.translateService
      .get('paginator.firstPageLabel')
      .subscribe((res: string) => {
        this.firstPageLabel = res;
      });

    this.translateService
      .get('paginator.lastPageLabel')
      .subscribe((res: string) => {
        this.lastPageLabel = res;
      });

    this.translateService
      .get('paginator.rangeLabel')
      .subscribe((res: string) => {
        this.getRangeLabel = (
          page: number,
          pageSize: number,
          length: number
        ) => {
          if (length === 0 || pageSize === 0) {
            return `0 ${res} ${length}`;
          }
          length = Math.max(length, 0);
          const startIndex = page * pageSize;
          const endIndex =
            startIndex < length
              ? Math.min(startIndex + pageSize, length)
              : startIndex + pageSize;
          return `${startIndex + 1} - ${endIndex} ${res} ${length}`;
        };
      });
  }
}
