import { inject, Injectable } from '@angular/core';
import { Producto } from '../models/producto.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private  http = inject(HttpClient);

  list(){
    return this.http.get<Producto[]>('http://localhost:8080/api/productos');
  }

  get(id: number){
    return this.http.get<Producto>(`http://localhost:8080/api/productos/${id}`);
  }

  create(producto: Producto){
    return this.http.post<Producto>('http://localhost:8080/api/productos', producto);
  }

  update(id: number, producto: Producto){
    return this.http.put<Producto>(`http://localhost:8080/api/productos/${id}`, producto);
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/api/productos/${id}`);
  }

}