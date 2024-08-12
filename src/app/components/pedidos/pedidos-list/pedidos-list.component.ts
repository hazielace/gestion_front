import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pedido } from '../../../models/pedido.interface';
import { PedidosService } from '../../../services/pedidos.service';

@Component({
  selector: 'app-pedidos-list',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './pedidos-list.component.html',
  styleUrl: './pedidos-list.component.css'
})
export default class PedidosListComponent implements OnInit{
  private pedidosService = inject(PedidosService);

  pedidos: Pedido[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(){
    this.pedidosService.list().subscribe(pedidos => {
      this.pedidos = pedidos;
      console.log(pedidos)
    })
  }

  deleteProducto(pedido :Pedido){
    this.pedidosService.delete(pedido.id).subscribe(()=>{
      console.log("ok");
      this.loadAll();
    })
  }
}
