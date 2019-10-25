import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UiGuard implements CanActivate {

  constructor(
    private _router: Router,
  ) { }

  public canActivate(): Observable<boolean> {
    return new Observable((ob) => {
      ob.next(true);
    });
  }

  private forward(isAuthorized: boolean): boolean {
    if (isAuthorized) { return true; }
    this._router.navigate(['login']);
    return false;
  }
}
