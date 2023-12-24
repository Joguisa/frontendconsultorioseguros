export interface ClientI {
    clienteId:     number;
    cedula:        string;
    nombreCliente: string;
    telefono:      string;
    edad:          number;
    fechaCreacion?: Date;
    estado?:        string;
}
export interface EditClientI {
    clienteId:     number;
    cedula:        string;
    nombreCliente: string;
    telefono:      string;
    edad:          number;
    fechaCreacion?: Date;
    estado?:        string;
}

export interface AddClientI {
    clienteId:     number;
    cedula:        string;
    nombreCliente: string;
    telefono:      string;
    edad:          number;
    fechaCreacion?: Date;
    estado?:        string;
}

export interface ClientFormI {
    clienteId:     number;
    cedula:        string;
    nombreCliente: string;
    telefono:      string;
    edad:          number;
    fechaCreacion: Date;
    estado:        string;
}