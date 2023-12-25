import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilsShared } from 'src/app/shared/helpers/utils-shared';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { InsuredI } from '../../insured/interfaces/insured';
import { InsuredService } from '../../insured/services/insured.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title: string = 'Clientes';
  isLoading: boolean = false;
  insurers$ = this.sharedDataService.insurers$;
  client: InsuredI[] =[];
  seguro: InsuredI[] = [];
  searchForm!: FormGroup;
  cedula: boolean = false;
  codigo: boolean = false;
  disabled: boolean = false;

  constructor(
    private insuredService: InsuredService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    private utilsShared: UtilsShared
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      searchCode: ['']
    });
  }

  /**
 * Obtiene los clientes por cédula de cliente.
 */
  getInsuredByCedula() {
    const searchTerm = this.searchForm.get('searchTerm')?.value;

    this.disabled = true
    this.isLoading = true;
    this.insuredService
      .getInsured().subscribe({
        next: (resp) => {
          if (searchTerm) {
            console.log('searchTerm', searchTerm);
            const filteredResp = resp.data.filter((insured) => {
              const includesSearchTerm = insured.cliente.cedula.includes(searchTerm);
              console.log('in resp', includesSearchTerm);
              return includesSearchTerm;
            });
            console.log('filteredResp', filteredResp);
            if (filteredResp.length > 0) {
              this.client = filteredResp;
              this.cedula = true;
              this.disabled = false;
            } else {
              this.toastService.warning('No se encontraron resultados');
              this.cedula = false;
              this.disabled = false;
            }
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.toastService.error(err);
          this.isLoading = false;
        }
      });
  }

  /**
   * Obtiene los clientes por código de seguro.
   */
  getInsuredByCode(){
    const searchCode = this.searchForm.get('searchCode')?.value;
    this.disabled = true
    this.isLoading = true;
    this.insuredService
      .getInsured().subscribe({
        next: (resp) => {
          if (searchCode) {
            console.log('searchCode', searchCode);
            
            const filteredResp = resp.data.filter((insured) => {
              const includesSearchTerm = insured.seguro.codigoSeguro.toLocaleLowerCase().includes(searchCode.toLocaleLowerCase());
              console.log('in resp', includesSearchTerm);
              return includesSearchTerm;
            });
            console.log('filteredResp', filteredResp);
            if (filteredResp.length > 0) {
              this.seguro = filteredResp;
              this.disabled = false;
              this.codigo = true;
            } else {
              this.toastService.warning('No se encontraron resultados');
              this.disabled = false;
              this.codigo = false;
            }
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.toastService.error(err);
          this.isLoading = false;
        }
      });
  }

  onKeyPressOnlyNumbers(event: KeyboardEvent): boolean {
    return this.utilsShared.onlyNumbers(event);
  }

}
