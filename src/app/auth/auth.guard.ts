import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuth();
  }

  canLoad() {
    return this.authService.isAuth()
      .pipe(
        take(1)
      );
  }
}
