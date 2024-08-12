import { Producto } from "./producto.interface";

export interface Pedido {
    id: string;
    idcliente: string;
    productos: Producto[];
    total: number;
    fecha_registro: string;
}