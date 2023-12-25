import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { InsuredI, EditInsuredI, AddInsuredI } from '../interfaces/insured';
import { GeneralResponse } from '../../../shared/interfaces/general-response';

@Injectable({
  providedIn: 'root'
})
export class InsuredService {

  private urlBase: string = environment.API_URL;
  private apiUrl: string = this.urlBase + 'api/';


  /**
   * Constructor
   * @param http 
   */
  constructor(private http: HttpClient) {}

  getInsured(): Observable<GeneralResponse<InsuredI[]>> {
    return this.http.get<GeneralResponse<InsuredI[]>>(`${this.apiUrl}asegurados`);
  }

  getInsuredById(id: number):Observable<GeneralResponse<InsuredI>>{
    return this.http.get<GeneralResponse<InsuredI>>(`${this.apiUrl}asegurados/${id}`);
  }

  saveInsuredAd(data: AddInsuredI): Observable<GeneralResponse<AddInsuredI>> {
    return this.http.post<GeneralResponse<AddInsuredI>>(`${this.apiUrl}asegurados`, data);
  }

  editInsuredAd(id: number, data: EditInsuredI) : Observable<GeneralResponse<EditInsuredI>>{
    return this.http.put<GeneralResponse<EditInsuredI>>(`${this.apiUrl}asegurados/${id}`, data);
  }

  deleteInsured(id: number): Observable<GeneralResponse<InsuredI>> {
    return this.http.delete<GeneralResponse<InsuredI>>(`${this.apiUrl}asegurados/${id}`);
  }


}
