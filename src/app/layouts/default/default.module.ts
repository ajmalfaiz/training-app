import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DefaultComponent } from './default.component';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { CustomersComponent } from 'src/app/modules/customers/customers.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DefaultComponent,
    AdminComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AppRoutingModule
  ]
})
export class DefaultModule { }
