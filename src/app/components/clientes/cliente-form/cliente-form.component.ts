import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente.interface';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export default class ClienteFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private clienteService = inject(ClientesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form ?: FormGroup;
  cliente ?: Cliente;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id',id);
    if(id){
      this.clienteService.get(parseInt(id)).subscribe(cliente => {
        this.cliente = cliente;
        console.log('p', cliente);
        this.form = this.fb.group({
          nombres: [cliente.nombres, [Validators.required]],
          apellidos: [cliente.apellidos, [Validators.required]],
          email: [cliente.email, [Validators.required, Validators.email]],
          telefono: [cliente.telefono, [Validators.required]],
        });
      });
    }
    else {
      this.form = this.fb.group({
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
      });
    }
  }

  save(){
    console.log(this.form!.value);
    const clienteForm = this.form!.value;

    if(this.form?.invalid){
      return;
    }

    if(this.cliente){
      this.clienteService.update(this.cliente.id, clienteForm).subscribe(()=>{
        console.log("success");
        
        this.router.navigate(['/clientes']);
      });
    }
    else {
      this.clienteService.create(clienteForm).subscribe(()=>{
        console.log("success");
        
        this.router.navigate(['/clientes']);
      });
    }
  }
}
