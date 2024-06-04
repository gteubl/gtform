/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

export class GtformTranslateLoader{
  public constructor(private http: HttpClient, private prefix: string = 'assets/i18n/', private suffix: string = '.json') {}

  public getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(
      map((res: any) => res)
    );
  }
}
