import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from 'src/app/core/services/language.service';
import { ILanguageVm, Languages } from 'src/app/core/utils/language.model';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './language.component.html',
})
export class LanguageComponent {
  public constructor(private readonly _langService: LanguageService) {}

  public availableLangs: ILanguageVm[] = Languages;

  public activatedLang: ILanguageVm = Languages.find(
    (l) => l?.id === this._langService.lang
  ) as ILanguageVm;

  public onSelectLang(lang: ILanguageVm): void {
    this.activatedLang = lang;
    this._langService.setLanguage(lang?.id);
  }
}
