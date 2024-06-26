import { Component, OnInit } from '@angular/core';
import { CoffeeProduct } from '../../interfaces/coffee.inteface';
import { CoffeeService } from '../../services/coffee-service.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{

 public coffeeProducts: CoffeeProduct [] = [];

 constructor(private coffeeServices: CoffeeService){}



 ngOnInit(): void {
    this.coffeeServices.getProducts()
    .subscribe( coffeeProduct => {
      this.coffeeProducts = coffeeProduct.slice(0,4);
      

    })
  }




}
