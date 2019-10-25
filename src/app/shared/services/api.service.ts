// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiOptions } from '../interfaces/api-options.interface';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(
    private _http: HttpClient,
  ) { }

  public get<T>(url: string, options?: ApiOptions): Observable<T> {
    return this.request('GET', url, options);
  }

  public post<T>(url: string, body?: any, options?: ApiOptions): Observable<T> {
    options = options || {};
    options.body = body;
    return this.request('POST', url, options);
  }

  public put<T>(url: string, body?: any, options?: ApiOptions): Observable<T> {
    options = options || {};
    options.body = body;
    return this.request('PUT', url, options);
  }

  public patch<T>(url: string, body?: any, options?: ApiOptions): Observable<T> {
    options = options || {};
    options.body = body;
    return this.request('PATCH', url, options);
  }

  public delete<T>(url: string, options?: ApiOptions): Observable<T> {
    return this.request('DELETE', url, options);
  }

  // return query form request
  public createQuery(params: { [key: string]: string | number | boolean | Array<any> }): string {
    let query = '?';
    for (const key in params) {
      if (params[key] instanceof Array) {
        (<Array<any>>params[key]).forEach(x => {
          query += `${key}=${x}&`;
        });
      } else {
        query += `${key}=${params[key]}&`;
      }
    }
    return query.substr(0, query.length - 1);
  }

  private request<T>(method: string, url: string, options?: ApiOptions): Observable<T> {
    // Set default option values
    if (options != null) {
      if (options.responseType == null) { options.responseType = 'json'; }
    }
    return this._http.request(method, url, options)
      .pipe(
        // catchError((error) => {
        //   console.error(error);// do console error
        //   return error;
        // })
      );
  }
}
