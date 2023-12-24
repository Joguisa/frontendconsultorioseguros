import { Component, OnInit } from '@angular/core';
import { InsuranceI } from '../../interfaces/insurance';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InsuranceService } from '../../services/insurance.service';

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.scss']
})
export class ListInsuranceComponent implements OnInit{

  insurances: InsuranceI[] = [];
  isLoading: boolean = false;

  constructor(
    private insuranceService: InsuranceService,
    private router: Router,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getInsurances();
  }

  /**
   * Obtiene los clientes.
   */
  getInsurances() {
    this.isLoading = true;
    this.insuranceService.getInsurances().subscribe({
      next: (resp) => {
        this.insurances = resp.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.error(err.error.message);
      }
    });
  }

  /**
   * Redirige a la página de editar.
   * @param data
   */
  goToEditPage(id: number) {
    this.router.navigateByUrl(`/insurances/edit/${id}`);
  }

  /**
   * Elimina un cliente.
   * @param id
   */
  deleteClient(id: number) {
    this.isLoading = true;
    this.insuranceService.deleteInsurance(id).subscribe({
      next: (resp) => {
        this.toastService.success(resp.message);
        this.getInsurances();
      },
      error: (err) => {
        this.toastService.error(err.error.message);
      },
    });
  }

  /**
   * Redirige a la página de agregar.
   */
  goToAddPage() {
    this.router.navigateByUrl(`/insurances/add`);
  }

  /**
   * Guarda la lista de clientes por archivo.
   */
  saveListClient() {
    throw new Error('Method not implemented.');
  }

}
