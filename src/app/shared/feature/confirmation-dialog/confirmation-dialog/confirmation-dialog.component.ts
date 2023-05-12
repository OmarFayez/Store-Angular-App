import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  ButtonTypes,
  ButtonColors,
} from 'src/app/shared/utils/button-properties';

@Component({
  selector: 'pw-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class ConfirmationDialogComponent {
  public constructor(
    public readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      ok: string;
      close: string;
    }
  ) {}

  public readonly ButtonTypes = ButtonTypes;
  public readonly ButtonColors = ButtonColors;
}
