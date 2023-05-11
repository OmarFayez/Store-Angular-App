import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BidirectionallyService } from './bidirectionally.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public constructor(
    private readonly _translate: TranslateService,
    public readonly _bidirectionallyService: BidirectionallyService
  ) {
    localStorage.getItem('lang') ?? localStorage.setItem('lang', 'en');

    this.setLanguage(
      JSON.parse(JSON.stringify(localStorage.getItem('lang'))) as string
    );
  }

  public languages: string[] = ['en', 'ar'];

  public lang!: string;

  public setLanguage(lang: string): void {
    this.lang = lang;

    const dir: Direction = lang === 'en' ? 'ltr' : 'rtl';

    this._bidirectionallyService.setDirection(dir);

    document.getElementsByTagName('html')[0].setAttribute('dir', dir);

    this._translate.use(lang);

    localStorage.setItem('lang', lang);
  }
}
