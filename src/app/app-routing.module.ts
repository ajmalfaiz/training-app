import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomersComponent } from './modules/customers/customers.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  {
      //layout
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
          //common entry
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },{
          path: 'customers',
          component: CustomersComponent,
          canActivate: [AuthGuard],
      },
      {
          path: 'admin',
          component: AdminComponent,
          canActivate: [AuthGuard]
      }
    ],
  },{
      //login page
      path: 'login',
      component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
