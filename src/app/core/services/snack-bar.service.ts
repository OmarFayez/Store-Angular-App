import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BidirectionallyService } from './bidirectionally.service';
export type SnackBarVariant = 'normal' | 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _direction: BidirectionallyService
  ) {}
  panelClass = (variant?: SnackBarVariant): string[] | undefined => {
    return variant === 'success'
      ? ['snack-success']
      : variant === 'error'
      ? ['snack-error']
      : undefined;
  };
  public snackbar = (
    message: string,
    variant?: SnackBarVariant,
    duration = 10000
  ): void => {
    debugger;
    this._snackBar.open(message, 'close', {
      direction: this._direction.direction,
      duration,
      panelClass: this.panelClass(variant),
    });
  };
}
