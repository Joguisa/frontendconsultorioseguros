export interface InsuranceI {
    seguroId:      number;
    nombreSeguro:  string;
    codigoSeguro:  string;
    sumaAsegurada: number;
    prima:         number;
    fechaCreacion?: Date;
    estado?:        string;
}

export interface EditInsuranceI {
    seguroId:      number;
    nombreSeguro:  string;
    codigoSeguro:  string;
    sumaAsegurada: number;
    prima:         number;
    fechaCreacion?: Date;
    estado?:        string;
}

export interface AddInsuranceI {
    seguroId:      number;
    nombreSeguro:  string;
    codigoSeguro:  string;
    sumaAsegurada: number;
    prima:         number;
    fechaCreacion?: Date;
    estado?:        string;
}

export interface InsuranceFormI {
    seguroId:      number;
    nombreSeguro:  string;
    codigoSeguro:  string;
    sumaAsegurada: number;
    prima:         number;
    fechaCreacion?: Date;
    estado?:        string;
    File?:         File | null;
}