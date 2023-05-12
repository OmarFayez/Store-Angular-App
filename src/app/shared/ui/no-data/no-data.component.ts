import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-data',
  template: `
    <div
      class="h-100 w-100 d-flex flex-column justify-content-center align-items-center  p-5"
    >
      <div class="d-flex justify-content-center align-items-center">
        <div
          class="d-flex  align-items-center justify-content-center  rounded-pill"
          style="width: 5rem; height:5rem;"
          [ngClass]="'text-gray-600 bg-gray-50 '"
        >
          <mat-icon style="height: 50px; width: 50px; font-size: 50px">{{
            icon ?? 'manage_search'
          }}</mat-icon>
        </div>
      </div>

      <h6 class="mt-3">
        {{ text ?? 'لا يوجد اي بيانات للعرض...' }}
      </h6>

      <ng-content></ng-content>
    </div>
  `,
})
export class NoDataComponent {
  @Input() public text?: string;

  @Input() public icon?: string;
}
