import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInsuredComponent } from './pages/add-insured/add-insured.component';
import { EditInsuredComponent } from './pages/edit-insured/edit-insured.component';
import { ListInsuredComponent } from './pages/list-insured/list-insured.component';

const routes: Routes = [
  {
    path: 'list', 
    component: ListInsuredComponent
  },
  {
    path: 'add',
    component: AddInsuredComponent
  },
  {
    path: 'edit/:id',
    component: EditInsuredComponent
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
export class InsuredRoutingModule { }
