import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // private insurersSubject = new BehaviorSubject<InsuredI[]>([]);
  // public insurers$ = this.insurersSubject.asObservable();

  // setInsurers(insurers: InsuredI[]) {
  //   this.insurersSubject.next(insurers);
  // }
}
