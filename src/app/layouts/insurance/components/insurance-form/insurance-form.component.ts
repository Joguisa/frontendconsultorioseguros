import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { InsuranceI, InsuranceFormI } from '../../interfaces/insurance';
import { InsuranceService } from '../../services/insurance.service';
import { UtilsShared } from 'src/app/shared/helpers/utils-shared';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.scss']
})
export class InsuranceFormComponent implements OnInit, OnChanges, OnDestroy{

  @Input() insurance!: InsuranceI;
  @Input() validForm: boolean = false;
  @Output() insuranceFormEvent: EventEmitter<InsuranceFormI> =
    new EventEmitter<InsuranceFormI>();
  @Output() validInsuranceFormEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  insuranceForm!: FormGroup;
  disabled: boolean = true;
  isLoading: boolean = false;
  protected onDestroy = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private utilsShared: UtilsShared,
    private insuranceService: InsuranceService,
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.insuranceForm.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res) => {
        this.insuranceFormEvent.emit(res);
        this.validInsuranceFormEvent.emit(this.insuranceForm.valid);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["validForm"]?.currentValue) {
      this.validInsuranceForm();
    }

    if (changes["insurance"]?.currentValue) {
      if (this.insurance) {
        this.setDataInsuranceToUpdate();
      }
    }
  }
  
  /**
   * OnDestroy
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  createForm() {
    this.insuranceForm = this.formBuilder.group({
      nombreSeguro: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-záÁéÉìÌíÍóÓúÚñÑA-Zs ]+(?: +[a-záÁéÉìÌíÍóÓúÚñÑA-Zs ]+)*$"
          ),
        ],
      ],
      codigoSeguro: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9áÁéÉìÌíÍóÓúÚñÑ\s]+$/),
        ],
      ],
      sumaAsegurada: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      prima: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      File: [null]
    });
  }

  /**
  * Setear data de el usuario a editar
  */
  setDataInsuranceToUpdate() {
    if (!this.insuranceForm) {
      console.log('El formulario no está inicializado.');
      return;
    }

    this.insuranceForm.get("nombreSeguro")?.setValue(this.insurance.nombreSeguro);
    this.insuranceForm.get("codigoSeguro")?.setValue(this.insurance.codigoSeguro);
    this.insuranceForm.get("sumaAsegurada")?.setValue(this.insurance.sumaAsegurada);
    this.insuranceForm.get("prima")?.setValue(this.insurance.prima);

    this.insuranceForm.get("nombreSeguro")?.enable();
    this.insuranceForm.get("codigoSeguro")?.enable();
    this.insuranceForm.get("sumaAsegurada")?.enable();
    this.insuranceForm.get("prima")?.enable();

    this.disabled = false;
  }

  /**
   * Setea la data del seguro
   * @param data 
   */
  setDataInsurance(data: InsuranceI) {
    this.insuranceForm.get("nombreSeguro")?.setValue(data.nombreSeguro);
    this.insuranceForm.get("codigoSeguro")?.setValue(data.codigoSeguro);
    this.insuranceForm.get("sumaAsegurada")?.setValue(data.sumaAsegurada);
    this.insuranceForm.get("prima")?.setValue(data.prima);
  }

  /**
   * Busca el seguro por el id
   * @param insurance 
   */
  findInsuranceId(insurance: number) {
    this.insuranceService
      .getInsuranceById(insurance)
      .pipe(debounceTime(600), takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          if (data) {
            this.setDataInsurance(data.data);
          }
          this.enableForm();
        },
        error: () => {
          this.disableForm();
        },
      });
  }

  /**
   * Habilita formulario
   */
  enableForm() {
    this.insuranceForm.get("nombreSeguro")?.enable();
    this.insuranceForm.get("codigoSeguro")?.enable();
    this.insuranceForm.get("sumaAsegurada")?.enable();
    this.insuranceForm.get("prima")?.enable();
    this.disabled = false;
  }

  /**
   * Deshabilita formulario
   */
  disableForm() {
    this.insuranceForm.reset();
    this.insuranceForm.get("nombreSeguro")?.disable();
    this.insuranceForm.get("codigoSeguro")?.disable();
    this.insuranceForm.get("sumaAsegurada")?.disable();
    this.insuranceForm.get("prima")?.disable();
    this.disabled = true;
  }

  /**
   * Valida el formulario
   * @returns 
   */
  validInsuranceForm() {
    if (this.insuranceForm) {
      if (this.insuranceForm.invalid) {
        this.insuranceForm.markAllAsTouched();
        this.validInsuranceFormEvent.emit(false);
        return;
      }
      this.validInsuranceFormEvent.emit(this.insuranceForm.valid);
    }
  }

  /**
   * Valida el input
   * @param event 
   * @param controlName 
   */
  onInputValid(event: any, controlName: string): void {
    const inputValue: string = event.target.value;
    if (inputValue.startsWith(' ')) {
      event.target.value = inputValue.trimStart();
      this.insuranceForm.get(controlName)?.setValue(event.target.value);
    }
  }

  /**
   * Método para validar que solo se ingresen letras en los inputs	
   * @param event 
   * @returns 
   */
  onKeyPressOnlyLetters(event: KeyboardEvent): boolean {
    return this.utilsShared.onlyLetters(event);
  }


  /**
   * Método para validar que solo se ingresen números en los inputs
   * @param event 
   * @returns 
   */
  onKeyPressOnlyNumbers(event: KeyboardEvent): boolean {
    return this.utilsShared.onlyNumbers(event);
  }


}
