import { ClientI } from "../../client/interfaces/client";
import { InsuranceI } from "../../insurance/interfaces/insurance";

export interface InsuredI {
    aseguradoId:   number;
    clienteId:     number;
    seguroId:      number;
    estado?:        string;
    fechaCreacion?: Date;
    cliente:       ClientI;
    seguro:        InsuranceI;
}

export interface AddInsuredI {
    aseguradoId:   number;
    clienteId:     number;
    seguroId:      number;
    estado?:        string;
    fechaCreacion?: Date;
    cliente?:       ClientI;
    seguro?:        InsuranceI;
}

export interface EditInsuredI {
    aseguradoId:   number;
    clienteId:     number;
    seguroId:      number;
    estado?:        string;
    fechaCreacion?: Date;
    cliente?:       ClientI;
    seguro?:        InsuranceI;
}

export interface InsuredFormI {
    aseguradoId:   number;
    clienteId:     number;
    seguroId:      number;
    estado:        string;
    fechaCreacion: Date;
    cliente:       ClientI;
    seguro:        InsuranceI;
}