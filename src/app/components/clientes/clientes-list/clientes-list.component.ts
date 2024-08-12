import { Component, inject, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { Cliente } from '../../../models/cliente.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export default class ClientesListComponent implements OnInit{
  private clientesService = inject(ClientesService);

  clientes: Cliente[] = [];

  ngOnInit(): void {
    this.loadAllClientes();
  }

  loadAllClientes(){
    this.clientesService.list().subscribe(clientes => {
      this.clientes = clientes;
      console.log(clientes)
    })
  }

  deleteCliente(cliente :Cliente){
    this.clientesService.delete(cliente.id).subscribe(()=>{
      console.log("ok");
      this.loadAllClientes();
    })
  }
}
