import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/shared/interfaces/general-response';
import { environment } from 'src/environment/environment';
import { AddClientI, ClientI, EditClientI } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlBase: string = environment.API_URL;
  private apiUrl: string = this.urlBase + 'api/';

  constructor(private http: HttpClient) {}

  getClients(): Observable<GeneralResponse<ClientI[]>> {
    return this.http.get<GeneralResponse<ClientI[]>>(`${this.apiUrl}clientes`);
  }


  getClientById(id: number):Observable<GeneralResponse<EditClientI>>{
    return this.http.get<GeneralResponse<EditClientI>>(`${this.apiUrl}clientes/${id}`);
  }

  saveClientAd(data: AddClientI): Observable<GeneralResponse<AddClientI>> {
    return this.http.post<GeneralResponse<AddClientI>>(`${this.apiUrl}clientes`, data);
  }

  editClientAd(id: number, data: EditClientI) : Observable<GeneralResponse<EditClientI>> {
    return this.http.put<GeneralResponse<EditClientI>>(`${this.apiUrl}clientes/${id}`, data);
  }

  deleteClient(id: number): Observable<GeneralResponse<ClientI>> {
    return this.http.delete<GeneralResponse<ClientI>>(`${this.apiUrl}clientes/${id}`);
  }


}
