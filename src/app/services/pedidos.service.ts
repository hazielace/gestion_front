import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private  http = inject(HttpClient);

  list(){
    return this.http.get<Pedido[]>('http://localhost:8080/api/pedidos');
  }

  get(id: string){
    return this.http.get<Pedido>(`http://localhost:8080/api/pedidos/${id}`);
  }

  create(pedido: Pedido){
    return this.http.post<Pedido>('http://localhost:8080/api/pedidos', pedido);
  }

  update(id: string, pedido: Pedido){
    return this.http.put<Pedido>(`http://localhost:8080/api/pedidos/${id}`, pedido);
  }

  delete(id: string){
    return this.http.delete(`http://localhost:8080/api/pedidos/${id}`);
  }
}
