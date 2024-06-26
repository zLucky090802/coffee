import { Component, Input, OnInit } from '@angular/core';
import { CoffeeProduct } from '../../interfaces/coffee.inteface';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal-service.service';
import { CoffeeService } from '../../services/coffee-service.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent  {

  coffeeProduct: CoffeeProduct[] = [];

  coffeeFilter: CoffeeProduct[] = [];


 


  constructor(private modalService: ModalService, private coffeeService: CoffeeService) {

  }

  // ngOnInit(): void {
  //   this.LoadProducts();

  // }
  // LoadProducts() {

  //   this.coffeeProduct = this.coffeeService.cargarCarrito();
  //   let existingProduct:CoffeeProduct[];



  //   for (var i = 0; i < this.coffeeProduct.length; i++) {
  //     // Utilizar el método filter para buscar el producto en coffeeFilter
  //     existingProduct = this.coffeeFilter.filter(item => item.title === this.coffeeProduct[i].title);



  //     if (existingProduct.length > 0) {
  //       // Si el producto ya existe en el carrito, sumar las cantidades

  //       existingProduct[0].cantidad! += this.coffeeProduct[i].cantidad!;
  //       // console.log(this.coffeeFilter)
  //     } else {
  //       // Si el producto no existe en el carrito, agregarlo
  //       this.coffeeFilter.push(this.coffeeProduct[i]);

  //     }
  //   }

  // }

  open() {
    this.modalService.openModal(this.coffeeProduct)
  }
}
