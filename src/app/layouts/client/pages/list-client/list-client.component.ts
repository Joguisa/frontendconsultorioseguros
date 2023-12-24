import { Component, OnInit } from '@angular/core';
import { ClientI } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clients: ClientI[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  /**
   * Obtiene los clientes.
   */
  getClients(){
    this.isLoading = true;
    this.clientService.getClients().subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.clients = resp.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.error(err);
      }
    });
  }

  /**
   * Redirige a la página de editar.
   * @param data
   */
  goToEditPage(id: number) {
    this.router.navigateByUrl(`/clients/edit/${id}`);
  }

  /**
   * Elimina un cliente.
   * @param id
   */
  deleteClient(id: number) {
    this.isLoading = true;
    this.clientService.deleteClient(id).subscribe({
      next: (resp) => {
        this.toastService.success(resp.message);
        this.getClients();
      },
      error: (error) => {
        this.toastService.error(error.error.message);
      },
    });
  }

  /**
   * Redirige a la página de agregar.
   */
  goToAddPage() {
    this.router.navigateByUrl(`/clients/add`);
  }

  /**
   * Guarda la lista de clientes por archivo.
   */
  saveListClient() {
    throw new Error('Method not implemented.');
  }

}
