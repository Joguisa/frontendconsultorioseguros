import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ListClientComponent } from './pages/list-client/list-client.component';
import { AddClientComponent } from './pages/add-client/add-client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClientFormComponent,
    ListClientComponent,
    AddClientComponent,
    EditClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
