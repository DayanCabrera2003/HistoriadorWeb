import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { CarritoComponent } from './carrito/carrito.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenuComponent, CarritoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  carrito: any[] = []; // Carrito compartido

  // Método para agregar un ítem al carrito
  agregarAlCarrito(item: any) {
    const itemExistente = this.carrito.find(i => i.nombre === item.nombre);

    if (itemExistente) {
      // Si el ítem ya está en el carrito, aumenta la cantidad
      itemExistente.cantidad += item.cantidad;
    } else {
      // Si el ítem no está en el carrito, lo agrega
      this.carrito.push({ ...item });
    }

    console.log('Carrito:', this.carrito); // Para depuración
  }
actualizarCarrito(nuevoCarrito: any[]) {
  this.carrito = nuevoCarrito; // Reemplazar el array por uno nuevo
}
}