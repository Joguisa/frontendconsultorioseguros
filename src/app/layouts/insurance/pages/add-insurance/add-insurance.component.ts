import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { InsuranceFormI, AddInsuranceI } from '../../interfaces/insurance';
import { InsuranceService } from '../../services/insurance.service';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent {
  isLoading: boolean = false;
  insurance!: InsuranceFormI;
  validForm: boolean = false;
  validInsuranceForm: boolean = false;
  protected onDestroy = new Subject<void>();

  /**
   * @param toastrService 
   * @param router 
   * @param insuranceService 
   */
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private insuranceService: InsuranceService,
  ) {}

  /**
   * OnDestroy
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  insuranceFormEvent(data: InsuranceFormI) {
    this.insurance = data;
  }

  /**
   * Guarda el cliente.
   * @returns 
   */
  saveInsurance(){
    if (!this.validForm) {
      this.validInsuranceForm = true;
      return;
    }
    const addInsurance: AddInsuranceI = {
      seguroId: this.insurance.seguroId,
      nombreSeguro: this.insurance.nombreSeguro,
      codigoSeguro: this.insurance.codigoSeguro,
      sumaAsegurada: this.insurance.sumaAsegurada,
      prima: this.insurance.prima
    };

    this.insuranceService
    .saveInsuranceAd(addInsurance)
    .pipe(takeUntil(this.onDestroy))
    .subscribe({
      next: (resp) => {
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
    this.router.navigateByUrl("/insurances/list");
  }

}
