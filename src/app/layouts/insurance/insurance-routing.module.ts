import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInsuranceComponent } from './pages/add-insurance/add-insurance.component';
import { EditInsuranceComponent } from './pages/edit-insurance/edit-insurance.component';
import { ListInsuranceComponent } from './pages/list-insurance/list-insurance.component';

const routes: Routes = [
  {
    path: 'list', 
    component: ListInsuranceComponent
  },
  {
    path: 'add',
    component:AddInsuranceComponent
  },
  {
    path: 'edit/:id',
    component: EditInsuranceComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
