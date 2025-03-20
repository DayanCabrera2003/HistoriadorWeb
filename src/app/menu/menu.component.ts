import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() agregarAlCarrito = new EventEmitter<any>(); // Evento para agregar al carrito
  categoriaSeleccionada: string | null = null;
  categoriaActiva: string | null = null;

  menuItems = {
    entrantes: [
      { nombre: 'Ensalada César', descripcion: 'Lechuga, pollo, croutones y aderezo César.', precio: 5.00, cantidad: 1, imagen: 'ensalada-cesar.jpg' },
      { nombre: 'Bruschetta', descripcion: 'Pan tostado con tomate, albahaca y aceite de oliva.', precio: 4.00, cantidad: 1, imagen: 'bruschetta.jpg' }
    ],
    'platos-fuertes': [
      { nombre: 'Filete de Res', descripcion: 'Filete de res a la parrilla con guarnición.', precio: 15.00, cantidad: 1, imagen: 'filete-res.jpg' },
      { nombre: 'Pasta Alfredo', descripcion: 'Pasta con salsa Alfredo y pollo.', precio: 12.00, cantidad: 1, imagen: 'pasta-alfredo.jpg' }
    ],
    bebidas: [
      { nombre: 'Agua Mineral', descripcion: 'Agua mineral natural.', precio: 1.50, cantidad: 1, imagen: 'agua-mineral.jpg' },
      { nombre: 'Refresco', descripcion: 'Refresco de cola o limón.', precio: 2.00, cantidad: 1, imagen: 'refresco.jpg' }
    ],
    postres: [
      { nombre: 'Cheesecake', descripcion: 'Cheesecake de fresa con base de galleta.', precio: 6.00, cantidad: 1, imagen: 'cheesecake.jpg' },
      { nombre: 'Tiramisú', descripcion: 'Postre italiano con café y cacao.', precio: 7.00, cantidad: 1, imagen: 'tiramisu.jpg' }
    ],
    sugerencias: [
      { nombre: 'Sopa del Día', descripcion: 'Sopa especial preparada por el chef.', precio: 8.00, cantidad: 1, imagen: 'sopa-dia.jpg' },
      { nombre: 'Especialidad del Chef', descripcion: 'Plato especial preparado por el chef.', precio: 20.00, cantidad: 1, imagen: 'especialidad-chef.jpg' },
      { nombre: 'Cheesecake', descripcion: 'Cheesecake de fresa con base de galleta.', precio: 6.00, cantidad: 1, imagen: 'cheesecake.jpg' },


    ]
  };

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.categoriaActiva = categoria;
  }

  obtenerItems(categoria: string) {
    return this.menuItems[categoria as keyof typeof this.menuItems];
  }

  agregarItemAlCarrito(item: any) {
    this.agregarAlCarrito.emit(item); // Emite el evento con el ítem
  }
}
