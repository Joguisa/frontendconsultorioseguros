import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsShared {

  /**
   * Valida que solo se ingresen números en el campo.
   *
   * @param event El evento de teclado.
   * @returns True si la tecla presionada es un número, false en caso contrario.
   */
  onlyNumbers(event: KeyboardEvent): boolean {
    const regex = /^\d+$/;
    return regex.test(event.key);
  }
}
