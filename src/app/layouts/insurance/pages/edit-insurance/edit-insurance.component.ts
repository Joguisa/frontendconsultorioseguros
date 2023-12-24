import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { InsuranceFormI, EditInsuranceI } from '../../interfaces/insurance';
import { InsuranceService } from '../../services/insurance.service';

@Component({
  selector: 'app-edit-insurance',
  templateUrl: './edit-insurance.component.html',
  styleUrls: ['./edit-insurance.component.scss']
})
export class EditInsuranceComponent implements OnInit, OnDestroy{

  insurance!: InsuranceFormI;
  validForm: boolean = false;
  validInsuranceForm: boolean = false;
  idInsurance!: number;
  insuranceEdit!: EditInsuranceI;
  isLoading: boolean = false;
  protected onDestroy = new Subject<void>();

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private insuranceService: InsuranceService,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idInsurance = params["id"];
    });
    console.log(this.idInsurance)
    this.getInsuranceById();
  }

  /**
   * OnDestroy
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  /**
   * Guarda el seguro.
   * @returns 
   */
  saveInsurance(){
    if (!this.validForm) {
      this.validInsuranceForm = true;
      return;
    }
    const insuranceEdit: EditInsuranceI = {
      seguroId: this.insurance.seguroId,
      nombreSeguro: this.insurance.nombreSeguro,
      codigoSeguro: this.insurance.codigoSeguro,
      sumaAsegurada: this.insurance.sumaAsegurada,
      prima: this.insurance.prima,

    };
    this.insuranceService
    .editInsuranceAd(this.idInsurance, insuranceEdit)
    .pipe(takeUntil(this.onDestroy))
    .subscribe({
      next: (resp) => {
        this.toastrService.success(resp.message);
        this.goToListPage();
      },
      error: (error) => {
        this.toastrService.error(error.error.message);
      }
    });
  }

  /**
   * Obtiene el usuario por id.
   */
  getInsuranceById(){
    this.insuranceService
    .getInsuranceById(this.idInsurance)
    .pipe(takeUntil(this.onDestroy))
    .subscribe({
      next: (data) => {
        console.log(data.data);
        
        this.insuranceEdit = data.data;
      },
      error: (error) => {
        this.toastrService.error(error.error.message);
      }
    });
  }

  /**
   * Obtiene la data a guardar.
   * @param data
   */
  insuranceFormEvent(data: InsuranceFormI) {
    this.insurance = data;
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
    this.router.navigateByUrl("/insurances/list");
  }

}
