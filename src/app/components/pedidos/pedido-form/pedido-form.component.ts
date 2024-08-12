import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidosService } from '../../../services/pedidos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pedido } from '../../../models/pedido.interface';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './pedido-form.component.html',
  styleUrl: './pedido-form.component.css'
})
export default class PedidoFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private pedidoService = inject(PedidosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form ?: FormGroup;
  pedido ?: Pedido;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id',id);
    if(id){
      this.pedidoService.get(id).subscribe(pedido => {
        this.pedido = pedido;
        console.log('pe', pedido);
        this.form = this.fb.group({
          cliente: [pedido.idcliente, [Validators.required]],
          productos: [pedido.productos, [Validators.required]],
          total: [pedido.total, [Validators.required]],
        });
      });
    }
    else {
      this.form = this.fb.group({
        cliente: ['', [Validators.required]],
          productos: ['', [Validators.required]],
          total: ['', [Validators.required]],
      });
    }
  }

  save(){
    console.log(this.form!.value);
    const productoForm = this.form!.value;

    if(this.form?.invalid){
      return;
    }

    if(this.pedido){
      this.pedidoService.update(this.pedido.id, productoForm).subscribe(()=>{
        console.log("success");
        
        this.router.navigate(['/productos']);
      });
    }
    else {
      this.pedidoService.create(productoForm).subscribe(()=>{
        console.log("success");
        
        this.router.navigate(['/productos']);
      });
    }
  }
}
