import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.css'
})
export default class ProductosListComponent implements OnInit {
  private productosService = inject(ProductosService);

  productos: Producto[] = [];

  ngOnInit(): void {
    this.loadAllProductos();
  }

  loadAllProductos(){
    this.productosService.list().subscribe(productos => {
      this.productos = productos;
      console.log(productos)
    })
  }

  deleteProducto(producto :Producto){
    this.productosService.delete(producto.id).subscribe(()=>{
      console.log("ok");
      this.loadAllProductos();
    })
  }

}
