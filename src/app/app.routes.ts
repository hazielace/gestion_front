import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'clientes', loadComponent: ()=> import ('./components/clientes/clientes-list/clientes-list.component') },
    { path: 'productos', loadComponent: ()=> import ('./components/productos/productos-list/productos-list.component') },
    { path: 'pedidos', loadComponent: ()=> import ('./components/pedidos/pedidos-list/pedidos-list.component') },

    { path: 'nuevo-producto', loadComponent: ()=> import ('./components/productos/producto-form/producto-form.component') },
    { path: 'nuevo-cliente', loadComponent: ()=> import ('./components/clientes/cliente-form/cliente-form.component') },
    { path: 'nuevo-pedido', loadComponent: ()=> import ('./components/pedidos/pedido-form/pedido-form.component') },

    { path: 'editar-producto/:id', loadComponent: ()=> import ('./components/productos/producto-form/producto-form.component') },
    { path: 'editar-cliente/:id', loadComponent: ()=> import ('./components/clientes/cliente-form/cliente-form.component') },
    { path: 'editar-pedido/:id', loadComponent: ()=> import ('./components/pedidos/pedido-form/pedido-form.component') },
];
