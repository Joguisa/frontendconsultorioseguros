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

  /**
   * Valida que solo se ingresen letras en el campo
   * @param event 
   * @returns 
   */
  onlyLetters(event: KeyboardEvent): boolean {
    const key = event.key;
    // Verifica si la tecla es una letra, espacio o caracteres específicos
    if (
      (key >= 'a' && key <= 'z') ||
      (key >= 'A' && key <= 'Z') ||
      key === ' ' ||
      (key >= 'À' && key <= 'Ö') ||
      (key >= 'Ø' && key <= 'ö') ||
      (key >= 'ø' && key <= 'ÿ')
    ) {
      return true;
    }
    return false;
  }
}
