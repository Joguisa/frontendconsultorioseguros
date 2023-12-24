import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ClientFormI, EditClientI } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit, OnDestroy{

  client!: ClientFormI;
  validForm: boolean = false;
  validClientForm: boolean = false;
  idClient!: number;
  clientEdit!: EditClientI;
  isLoading: boolean = false;
  protected onDestroy = new Subject<void>();

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idClient = params["id"];
    });
    this.getClientById();
  }

  /**
   * OnDestroy
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
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
    const clientEdit: EditClientI = {
      clienteId: this.client.clienteId,
      cedula: this.client.cedula,
      nombreCliente: this.client.nombreCliente,
      telefono: this.client.telefono,
      edad: this.client.edad
    };
    this.clientService
    .editClientAd(this.idClient, clientEdit)
    .pipe(takeUntil(this.onDestroy))
    .subscribe({
      next: (resp) => {
        this.toastrService.success(resp.message);
        this.goToListPage();
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
    });
  }

  /**
   * Obtiene el usuario por id.
   */
  getClientById(){
    this.clientService
    .getClientById(this.idClient)
    .pipe(takeUntil(this.onDestroy))
    .subscribe({
      next: (data) => {
        this.clientEdit = data.data;
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      }
    });
  }

  /**
   * Obtiene la data a guardar.
   * @param data
   */
  clientFormEvent(data: ClientFormI) {
    this.client = data;
  }

  /**
   * Valida el formulario
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
