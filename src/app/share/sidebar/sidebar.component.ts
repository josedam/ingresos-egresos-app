import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

export class SidebarComponent implements OnInit, OnDestroy {

  nombreUsusario: string;

  constructor(
              private authService: AuthService,
            ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  CerrarSecion() {
    this.authService.logout();
  }

}
