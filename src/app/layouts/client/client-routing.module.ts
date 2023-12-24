import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './pages/add-client/add-client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { ListClientComponent } from './pages/list-client/list-client.component';

const routes: Routes = [
  {
    path: 'list', 
    component: ListClientComponent
  },
  {
    path: 'add',
    component:AddClientComponent
  },
  {
    path: 'edit/:id',
    component: EditClientComponent
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
export class ClientRoutingModule { }
