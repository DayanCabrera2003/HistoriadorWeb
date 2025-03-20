import { Component, Input,Output, EventEmitter,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  @Input() carrito: any[] = []; // Recibe el carrito desde el componente padre
  @Output() carritoActualizado = new EventEmitter<any>(); // Emite un evento cuando se agrega un producto al carrito
  faShoppingCart = faShoppingCart; // Ícono de carrito
  faMinus = faMinus; // Ícono de menos
  mostrarModal: boolean = false; // Controla la visibilidad del modal
  faCheckCircle = faCheckCircle;
  faCircle = faCircle;
  //Formulario de pago
  mostrarFormularioPago: boolean = false;
  nombreCliente: string = '';
  direccion: string = '';
  metodoPago: 'efectivo' | 'transferencia' | null = null;

  intentoEnvio: boolean = false;


  // Calcula la cantidad total de platos en el carrito
  get cantidadTotal(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }

  // Abre el modal
  abrirModal() {
    this.mostrarModal = true;
  }

  // Cierra el modal
  cerrarModal() {
    this.mostrarModal = false;
  }

  // Calcula el subtotal de un ítem
  calcularSubtotal(item: any): string {
    const precio = parseFloat(item.precio.toString().replace('$', '')); // Asegura que el precio sea un número
    return `$${(precio * item.cantidad).toFixed(2)}`;
  }

  // Calcula el total de la orden
  calcularTotal(): string {
    const total = this.carrito.reduce((sum, item) => {
      const precio = parseFloat(item.precio.toString().replace('$', '')); // Asegura que el precio sea un número
      return sum + precio * item.cantidad;
    }, 0);
    return `$${total.toFixed(2)}`;
  }

  // Cambiar Modal
  cambiarModal() {
    this.mostrarModal = false; // Cierra el modal de la orden
    this.mostrarFormularioPago = true; // Abre el formulario de pago
  }

  // Reduce la cantidad de un ítem
  reducirCantidad(item: any) {
    let nuevoCarrito = [...this.carrito];
    const index = nuevoCarrito.findIndex(i => i === item);

    if (index !== -1)
    {
      if(item.cantidad>1)
      {
        nuevoCarrito[index]={...item,cantidad:item.cantidad-1};
      }
     
      else 
      {
      // Si la cantidad es 1, elimina el ítem del carrito
        nuevoCarrito=nuevoCarrito.filter(i => i !== item);
      }
      this.carritoActualizado.emit(nuevoCarrito);// Emitir el nuevo array
    }
  }
  accederFormularioPago() {
    this.mostrarModal = false; // Cierra el modal de la orden
    this.mostrarFormularioPago = true; // Abre el formulario de pago
  }
  // Nuevo método para confirmar el pago
  confirmarPago() {
    this.intentoEnvio = true;
    if (this.nombreCliente && this.direccion && this.metodoPago) {
      const mensaje = this.carrito.map(item => {
        const subtotal = this.calcularSubtotal(item);
        return `${item.nombre} x${item.cantidad} - ${subtotal}`;
        this.intentoEnvio = true;
      }).join('%0A');

      const total = this.calcularTotal();
      const telefono = '5355801450';
      const datosCliente = `%0A%0A*Datos del cliente*%0ANombre: ${this.nombreCliente}%0ADirección: ${this.direccion}%0AMétodo de pago: ${this.metodoPago}`;
      
      const url = `https://wa.me/${telefono}?text=${mensaje}%0A%0ASubTotal:${total}%0A${datosCliente}`;
      window.open(url, '_blank');
      
      // Resetear valores
      this.mostrarFormularioPago = false;
      this.nombreCliente = '';
      this.direccion = '';
      this.metodoPago = null;
    }
  }
}
