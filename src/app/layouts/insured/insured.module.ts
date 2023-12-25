import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuredRoutingModule } from './insured-routing.module';
import { ListInsuredComponent } from './pages/list-insured/list-insured.component';
import { AddInsuredComponent } from './pages/add-insured/add-insured.component';
import { EditInsuredComponent } from './pages/edit-insured/edit-insured.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListInsuredComponent,
    AddInsuredComponent,
    EditInsuredComponent
  ],
  imports: [
    CommonModule,
    InsuredRoutingModule,
    SharedModule
  ]
})
export class InsuredModule { }
