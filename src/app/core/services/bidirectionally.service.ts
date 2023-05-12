import { Direction, Directionality } from '@angular/cdk/bidi';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BidirectionallyService {
  public constructor(public readonly dir: Directionality) {
    this.dir.change
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((direction: Direction) => this._changeDirection.next(direction))
      )
      .subscribe();
  }
  private destroyRef = inject(DestroyRef);

  private readonly _changeDirection = new BehaviorSubject<Direction>('rtl');

  public direction$: Observable<Direction> =
    this._changeDirection.asObservable();

  public isRtl$: Observable<boolean> = this.direction$.pipe(
    map((direction) => direction === 'rtl')
  );

  public get direction() {
    return this._changeDirection.value;
  }
  /**
   *
   * @param dir Dom Direction (ltr Or rtl)
   * @param onInit to specify which case we are => when init app OR just change it manually For showing loader
   */
  public setDirection(dir: Direction, onInit = true): void {
    if (onInit) {
      this.dir.change.emit(dir);
    } else {
      //TODO: Show splash screen here
      setTimeout(() => {
        this.dir.change.emit(dir);
        //TODO: Hide splash screen here
      }, 1000);
    }
  }
}
