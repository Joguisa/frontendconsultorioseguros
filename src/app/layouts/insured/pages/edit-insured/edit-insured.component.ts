import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, forkJoin } from 'rxjs';
import { ClientI } from 'src/app/layouts/client/interfaces/client';
import { ClientService } from 'src/app/layouts/client/services/client.service';
import { InsuranceI } from 'src/app/layouts/insurance/interfaces/insurance';
import { InsuranceService } from 'src/app/layouts/insurance/services/insurance.service';
import { EditInsuredI } from '../../interfaces/insured';
import { InsuredService } from '../../services/insured.service';

@Component({
  selector: 'app-edit-insured',
  templateUrl: './edit-insured.component.html',
  styleUrls: ['./edit-insured.component.scss']
})
export class EditInsuredComponent implements OnInit, OnDestroy {
  insuredForm!: FormGroup;
  insuredEdit!: EditInsuredI;
  clients: ClientI[] = [];
  insurances: InsuranceI[] = [];
  idInsured!: number; // este será el id que recupero de la url
  isLoading: boolean = false;
  protected onDestroy = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private insuredService: InsuredService,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private insuranceService: InsuranceService,
  ) { }

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idInsured = parseInt(params["id"], 10);
    });

    this.createForm();
    this.getInsuranceData();
  }

  /**
   * OnDestroy
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  createForm() {
    this.insuredForm = this.formBuilder.group({
      clienteId: ['', Validators.required],
      seguroId: ['', Validators.required],
    });
  }

  /**
   * Obtiene los datos del aseguro.
   * Llamamos a los 3 servivios y cuando cargue la respuesta de los 3,
   * enviamos la data ya que a veces se enviaba como undefined porque
   * no se renderizaba a tiempo.
   */
  getInsuranceData() {
    this.isLoading = true;

    forkJoin({
      insured: this.insuredService.getInsuredById(this.idInsured),
      clients: this.clientService.getClients(),
      insurances: this.insuranceService.getInsurances()
    }).subscribe({
      next: (data) => {
        if (data.insured && data.clients && data.insurances) {
          this.insuredEdit = data.insured.data;
          this.setDataInsured(data.insured.data);
          this.clients = data.clients.data;
          this.insurances = data.insurances.data;
          this.isLoading = false;
        } else {
          this.toastrService.error(data.insured.message);
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
        this.isLoading = false;
      }
    });
  }

  /**
   * Setear data6913
   */
  setDataInsured(data: EditInsuredI) {
    this.insuredForm.get('clienteId')?.setValue(data.cliente?.clienteId);
    this.insuredForm.get('seguroId')?.setValue(data.seguro?.seguroId);
  }

  /**
   * Guarda el seguro.
   * @returns 
   */
  saveInsurance() {
    this.isLoading = true;
    const editInsured: EditInsuredI = {
      aseguradoId: this.idInsured,
      clienteId: parseInt(this.insuredForm.get('clienteId')?.value, 10),
      seguroId: parseInt(this.insuredForm.get('seguroId')?.value, 10),
    };

    this.insuredService.editInsuredAd(this.idInsured, editInsured).subscribe({
      next: (data) => {
        this.toastrService.success(data.message);
        this.goToListPage();
        this.isLoading = false;
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
        this.isLoading = false;
      }
    });
  }



  /**
  * Ir a la página listado de usuarios.
  */
  goToListPage() {
    this.router.navigateByUrl("/insured/list");
  }

}
