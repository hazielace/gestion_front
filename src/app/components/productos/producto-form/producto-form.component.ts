import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.interface';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export default class ProductoFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private productoService = inject(ProductosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form ?: FormGroup;
  producto ?: Producto;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id',id);
    if(id){
      this.productoService.get(parseInt(id)).subscribe(producto => {
        this.producto = producto;
        console.log('p', producto);
        this.form = this.fb.group({
          nombre: [producto.nombre, [Validators.required]],
          descripcion: [producto.descripcion, [Validators.required]],
          cantidad: [producto.cantidad, [Validators.required]],
          precio: [producto.precio, [Validators.required]],
        });
      });
    }
    else {
      this.form = this.fb.group({
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        cantidad: ['', [Validators.required]],
        precio: ['', [Validators.required]],
      });
    }
  }

  save(){
    console.log(this.form!.value);
    const productoForm = this.form!.value;

    if(this.form?.invalid){
      return;
    }

    if(this.producto){
      this.productoService.update(this.producto.id, productoForm).subscribe(()=>{
        console.log("success");
        
        this.router.navigate(['/productos']);
      });
    }
    else {
      this.productoService.create(productoForm).subscribe(()=>{
        console.log("success");
        
        this.router.navigate(['/productos']);
      });
    }
  }
}
