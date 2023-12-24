import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

}
