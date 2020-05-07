import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomersComponent } from './modules/customers/customers.component';
import { AdminComponent } from './modules/admin/admin.component';

const routes: Routes = [
  {
      //layout
    path: '',
    component: DefaultComponent,
    children: [
      {
          //common entry
        path: '',
        component: DashboardComponent,
      },{
          path: 'customers',
          component: CustomersComponent
      },
      {
          path: 'admin',
          component: AdminComponent
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
