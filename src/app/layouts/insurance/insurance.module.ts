import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceFormComponent } from './components/insurance-form/insurance-form.component';
import { ListInsuranceComponent } from './pages/list-insurance/list-insurance.component';
import { AddInsuranceComponent } from './pages/add-insurance/add-insurance.component';
import { EditInsuranceComponent } from './pages/edit-insurance/edit-insurance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InsuranceFormComponent,
    ListInsuranceComponent,
    AddInsuranceComponent,
    EditInsuranceComponent
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    SharedModule
  ]
})
export class InsuranceModule { }
