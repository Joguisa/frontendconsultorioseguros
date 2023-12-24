import { Component, OnDestroy } from '@angular/core';
import { AddClientI, ClientFormI } from '../../interfaces/client';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnDestroy {

  isLoading: boolean = false;
  client!: ClientFormI;
  validForm: boolean = false;
  validClientForm: boolean = false;
  protected onDestroy = new Subject<void>();

  /**
   * @param toastrService 
   * @param router 
   * @param clientService 
   */
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private clientService: ClientService,
  ) {}

  /**
   * OnDestroy
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  clientFormEvent(data: ClientFormI) {
    this.client = data;
  }

  /**
   * Guarda el cliente.
   * @returns 
   */
  saveClient(){
    if (!this.validForm) {
      this.validClientForm = true;
      return;
    }
    const addClient: AddClientI = {
      clienteId: this.client.clienteId,
      cedula: this.client.cedula,
      nombreCliente: this.client.nombreCliente,
      telefono: this.client.telefono,
      edad: this.client.edad
    };

    this.clientService
    .saveClientAd(addClient)
    .pipe(takeUntil(this.onDestroy))
    .subscribe({
      next: (resp) => {
        console.log(resp);
        this.toastrService.success(resp.message);
        this.goToListPage();
      }, error: (error) => {
        this.toastrService.error(error.error.message);
      },
    });
  }

  /**
   * Valida el formulario.
   * @param event 
   */
  setValidForm(event: boolean) {
    this.validForm = event;
  }

  /**
   * Ir a la página listado de usuarios.
   */
  goToListPage() {
    this.router.navigateByUrl("/clients/list");
  }

}
