import { Component } from '@angular/core';
import { InsuredService } from '../../services/insured.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-list-insured',
  templateUrl: './list-insured.component.html',
  styleUrls: ['./list-insured.component.scss']
})
export class ListInsuredComponent {

  isLoading: boolean = false;
  insurers$ = this.sharedDataService.insurers$;

  constructor(
    private insuredService: InsuredService,
    private toastService: ToastrService,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getInsured();
  }

  /**
   * Obtiene los asegurados.
   */
  getInsured() {
    this.isLoading = true;
    this.insuredService
      .getInsured().subscribe({
        next: (resp) => {
          console.log(resp.data);
          
          this.sharedDataService.setInsurers(resp.data);
          this.isLoading = false;
        },
        error: (err) => {
          this.toastService.error(err.message);
        }
      });
  }

  /**
   * Redirige a la página de editar.
   * @param data
   */
  goToEditPage(id: number) {
    this.router.navigateByUrl(`/insured/edit/${id}`);
  }

  /**
   * Elimina un cliente.
   * @param id
   */
  deleteInsured(id: number) {
    this.isLoading = true;
    this.insuredService.deleteInsured(id).subscribe({
      next: (resp) => {
        this.toastService.success(resp.message);
        this.getInsured();
      },
      error: (error) => {
        this.toastService.error(error.message);
      },
    });
  }

  /**
   * Redirige a la página de agregar.
   */
  goToAddPage() {
    this.router.navigateByUrl(`/insured/add`);
  }

  /**
   * Guarda la lista de clientes por archivo.
   */
  saveListClient() {
    throw new Error('Method not implemented.');
  }

}
