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
export class ListInsuranceComponent implements OnInit {

  insurances: InsuranceI[] = [];
  isLoading: boolean = false;
  selectedFile!: File | null;
  pagedInsurances!: InsuranceI[];
  itemsPerPage = 5; // Número de elementos por página
  currentPage = 1; // Página actual
  totalPages!: number;
  pages: number[] = [];


  constructor(
    private router: Router,
    private toastService: ToastrService,
    private insuranceService: InsuranceService,
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
        this.totalPages = Math.ceil(this.insurances.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePage();
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

  onFileSelected(event: any): void {
    console.log(event);
    
    const inputElement = event?.target as HTMLInputElement;
    const fileList: FileList | null = inputElement?.files;
  
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }

  /**
   * Guarda la lista de seguros por archivo.
   */
  saveListClient(): void {
    if (this.selectedFile) {
      console.log('pasa')
      this.insuranceService.uploadFileEntity(this.selectedFile)
      .subscribe(response => {
        this.toastService.success(response.message);
        this.getInsurances();
      });
    }
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedInsurances = this.insurances.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Método para cambiar la página
  pageChanged(event: any): void {
    this.currentPage = event;
    this.updatePage();
  }


}
