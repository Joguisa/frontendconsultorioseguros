import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientFormI, ClientI } from '../../interfaces/client';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { UtilsShared } from 'src/app/shared/helpers/utils-shared';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() client!: ClientI;
  @Input() validForm: boolean = false;
  @Output() clientFormEvent: EventEmitter<ClientFormI> =
    new EventEmitter<ClientFormI>();
  @Output() validClientFormEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  clientForm!: FormGroup;
  disabled: boolean = true;
  protected onDestroy = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private utilsShared: UtilsShared,
    private clientService: ClientService
  ) { }

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.createForm();
    this.clientForm.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res) => {
        this.clientFormEvent.emit(res);
        this.validClientFormEvent.emit(this.clientForm.valid);
      });
  }

  /**
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["validForm"]?.currentValue) {
      this.validClientForm();
    }

    if (changes["client"]?.currentValue) {
      if (this.client) {
        this.setDataClientToUpdate();
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
    this.clientForm = this.formBuilder.group({
      cedula: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]{10}$"),
          Validators.maxLength(10),
        ],
      ],
      nombreCliente: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-záÁéÉìÌíÍóÓúÚñÑA-Zs ]+(?: +[a-záÁéÉìÌíÍóÓúÚñÑA-Zs ]+)*$"
          ),
        ],
      ],
      telefono: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]{0,10}$"),
        ],
      ],
      edad: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ],
      ],
    });
  }

  /**
  * Setear data de el usuario a editar
  */
  setDataClientToUpdate() {
    if (!this.clientForm) {
      console.log('El formulario no está inicializado.');
      return;
    }

    this.clientForm.get("cedula")?.setValue(this.client.cedula);
    this.clientForm.get("nombreCliente")?.setValue(this.client.nombreCliente);
    this.clientForm.get("telefono")?.setValue(this.client.telefono);
    this.clientForm.get("edad")?.setValue(this.client.edad);
    this.clientForm.get("cedula")?.enable();
    this.clientForm.get("nombreCliente")?.enable();
    this.clientForm.get("telefono")?.enable();
    this.clientForm.get("edad")?.enable();

    this.disabled = false;
  }

  /**
   * Setea la data del cliente
   * @param data 
   */
  setDataClient(data: ClientI) {
    this.clientForm.get("cedula")?.setValue(data.cedula);
    this.clientForm.get("nombreCliente")?.setValue(data.nombreCliente);
    this.clientForm.get("telefono")?.setValue(data.telefono);
    this.clientForm.get("edad")?.setValue(data.edad);
  }

  /**
   * Busca el cliente por el id
   * @param client 
   */
  findClientId(client: number) {
    this.clientService
      .getClientById(client)
      .pipe(debounceTime(600), takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          if (data) {
            this.setDataClient(data.data);
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
    this.clientForm.get("cedula")?.enable();
    this.clientForm.get("nombreCliente")?.enable();
    this.clientForm.get("telefono")?.enable();
    this.clientForm.get("edad")?.enable();
    this.disabled = false;
  }

  /**
   * Deshabilita formulario
   */
  disableForm() {
    this.clientForm.reset();
    this.clientForm.get("cedula")?.disable();
    this.clientForm.get("nombreCliente")?.disable();
    this.clientForm.get("telefono")?.disable();
    this.clientForm.get("edad")?.disable();
    this.disabled = true;
  }

  /**
   * Valida el formulario
   * @returns 
   */
  validClientForm() {
    if (this.clientForm) {
      if (this.clientForm.invalid) {
        this.clientForm.markAllAsTouched();
        this.validClientFormEvent.emit(false);
        return;
      }
      this.validClientFormEvent.emit(this.clientForm.valid);
    }
  }

  /**
   * Método para emitir el formulario	
   * @param event 
   * @param controlName 
   */
  onInputValid(event: any, controlName: string): void {
    const inputValue: string = event.target.value;
    if (inputValue.startsWith(' ')) {
      event.target.value = inputValue.trimStart();
      this.clientForm.get(controlName)?.setValue(event.target.value);
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
