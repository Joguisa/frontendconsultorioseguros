import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponse } from 'src/app/shared/interfaces/general-response';
import { environment } from 'src/environment/environment';
import { AddInsuranceI, EditInsuranceI, InsuranceI } from '../interfaces/insurance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private urlBase: string = environment.API_URL;
  private apiUrl: string = this.urlBase + 'api/';

  /**
   * Constructor
   * @param http 
   */
  constructor(private http: HttpClient) {}

  getInsurances(): Observable<GeneralResponse<InsuranceI[]>> {
    return this.http.get<GeneralResponse<InsuranceI[]>>(`${this.apiUrl}seguros`);
  }

  getInsuranceById(id: number):Observable<GeneralResponse<EditInsuranceI>>{
    return this.http.get<GeneralResponse<EditInsuranceI>>(`${this.apiUrl}seguros/${id}`);
  }

  saveInsuranceAd(data: AddInsuranceI): Observable<GeneralResponse<AddInsuranceI[]>> {
    return this.http.post<GeneralResponse<AddInsuranceI[]>>(`${this.apiUrl}seguros`, data);
  }

  editInsuranceAd(id: number, data: EditInsuranceI) : Observable<GeneralResponse<EditInsuranceI>>{
    return this.http.put<GeneralResponse<EditInsuranceI>>(`${this.apiUrl}seguros/${id}`, data);
  }

  deleteInsurance(id: number): Observable<GeneralResponse<InsuranceI>> {
    return this.http.delete<GeneralResponse<InsuranceI>>(`${this.apiUrl}seguros/${id}`);
  }
}
