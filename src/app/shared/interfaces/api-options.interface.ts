// Angular
import { HttpHeaders, HttpParams } from '@angular/common/http';

type ResponseType = 'json' | 'arraybuffer' | 'blob' | 'text';
// type NotifyType = 'error' | 'info' | 'warning';

export type Headers = HttpHeaders | {
  [header: string]: string | string[];
};

export interface ApiOptions {
  body?: any;
  headers?: Headers;
  observe?: 'response' | 'body';
  params?: HttpParams | { [param: string]: string | string[]; };
  reportProgress?: boolean;
  responseType?: ResponseType;
  withCredentials?: boolean;
  // notify?: NotifyType;
  errorMessage?: boolean;
}
