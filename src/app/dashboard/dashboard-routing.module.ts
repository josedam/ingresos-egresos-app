
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
   {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes
        // canActivate: [AuthGuard] se pasa al app-routing porque el load es lazzy
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
