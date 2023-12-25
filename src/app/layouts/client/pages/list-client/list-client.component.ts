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
  isLoading: boolean = false;
  pagedClients!: ClientI[];
  itemsPerPage = 5; // Número de elementos por página
  currentPage = 1; // Página actual
  totalPages!: number;
  pages: number[] = [];

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
        this.clients = resp.data;
        this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePage();
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


  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedClients = this.clients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Método para cambiar la página
  pageChanged(event: any): void {
    this.currentPage = event;
    this.updatePage();
  }

}
