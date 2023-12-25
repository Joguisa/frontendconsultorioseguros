import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ClientI } from 'src/app/layouts/client/interfaces/client';
import { ClientService } from 'src/app/layouts/client/services/client.service';
import { InsuranceI } from 'src/app/layouts/insurance/interfaces/insurance';
import { InsuranceService } from 'src/app/layouts/insurance/services/insurance.service';
import { InsuredService } from '../../services/insured.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { InsuredI } from '../../interfaces/insured';

@Component({
  selector: 'app-add-insured',
  templateUrl: './add-insured.component.html',
  styleUrls: ['./add-insured.component.scss']
})
export class AddInsuredComponent {

  clients: ClientI[] = [];
  insurances: InsuranceI[] = [];
  insureds!: InsuredI[];
  isLoading: boolean = false;
  insuredForm!: FormGroup;
  protected onDestroy = new Subject<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private insuredService: InsuredService,
    private clientService: ClientService,
    private insuranceService: InsuranceService,
  ) { }

  /**
   * OnDestroy
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngOnInit(): void {
    this.createForm();
    this.getClients();
    this.getInsurances();
  }

  createForm() {
    this.insuredForm = this.formBuilder.group({
      clienteId: ['', Validators.required],
      seguroId: ['', Validators.required],
    })
  }

  /**
   * Obtiene los clientes.
   */
  getClients() {
    this.isLoading = true;
    this.clientService
      .getClients().subscribe({
        next: (resp) => {
          this.clients = resp.data;
          this.isLoading = false;
        },
        error: (err) => {
          this.toastService.error(err);
        }
      });
  }

  /**
   * Obtiene los seguros.
   */
  getInsurances() {
    this.isLoading = true;
    this.insuranceService
      .getInsurances().subscribe({
        next: (resp) => {
          this.insurances = resp.data;
          this.isLoading = false;
        },
        error: (err) => {
          this.toastService.error(err);
        }
      });
  }

  saveInsurance() {
    if (this.insuredForm.valid) {
      const addInsured = this.insuredForm.value;
      this.insuredService.saveInsuredAd(addInsured)
        .subscribe({
          next: (resp) => {
            this.toastService.success(resp.message);
            this.goToListPage();
          },
          error: (err) => {
            this.toastService.error(err.message);
          }
        });
    }
  }

  goToListPage() {
    this.router.navigateByUrl(`/insured/list`);
  }

}
