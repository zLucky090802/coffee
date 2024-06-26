import { Component, OnInit } from '@angular/core';
import { CoffeeService } from '../../../coffee/services/coffee-service.service';
import { CoffeeProduct } from '../../../coffee/interfaces/coffee.inteface';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { CoffeeBeans } from '../../../coffee/interfaces/coffeeBean.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements  OnInit {

  public coffeeProducts: CoffeeProduct [] = [];
  public coffeeProductsIced: CoffeeProduct [] = [];
  public coffeeBeans:CoffeeBeans[] = [];

  constructor(
    private coffeeServices:CoffeeService,
    private routeActived:ActivatedRoute,
    private route:Router
  ){}

  ngOnInit(): void {
    // this.routeActived.params
    // .pipe(
    //   switchMap( ({ type }) => this.coffeeServices.getProductsByType( type ))
    // )
    // .subscribe( coffee =>{
     

    //   return this.coffeeProducts = coffee
    // }
      
     
    // )

    forkJoin([
      this.coffeeServices.getProductsByType('hot'),
      this.coffeeServices.getProductsByType('iced'),
      this.coffeeServices.getBeanProducts()
    ]).subscribe(
      ([hotCoffee, icedCoffee, bean]) => {
        // Procesamos los resultados
        this.coffeeProducts = hotCoffee.slice(0, 5);
        this.coffeeProductsIced = icedCoffee.slice(0, 5);
        this.coffeeBeans =  bean.slice(0,5)
        console.log(bean)
      },
      error => {
        // Manejo de errores, si es necesario
        console.error('Error fetching coffee products:', error);
      }
    );
    
    // this.coffeeServices.getProducts().subscribe( coffee=>{
    //   this.coffeeProducts= coffee.slice(0,5)
    // }

    
    // )
    // this.coffeeServices.getProductsByType('iced').subscribe(
    //   coffee=>{
    //     this.coffeeProductsIced= coffee.slice(0,5)
    //   }
    // )

    // this.coffeeServices.getBeanProducts().subscribe(
    //   coffee=>{
    //     this.coffeeBeans = coffee.slice(0,6)
    //   }
    // )

    // forkJoin([
    //   this.coffeeServices.getProductsByType('hot').pipe(map(coffee => coffee.slice(0, 5))),
    //   this.coffeeServices.getProductsByType('iced').pipe(map(coffee => coffee.slice(0, 5))),
    //   this.coffeeServices.getBeanProducts().pipe(map(coffee => coffee.slice(0, 6)))
    // ]).subscribe(
    //   ([hotCoffee, icedCoffee, beans]) => {
    //     this.coffeeProducts = hotCoffee;
    //     this.coffeeProductsIced = icedCoffee;
    //     this.coffeeBeans = beans;
    //   },
    //   error => {
    //     console.error('Error fetching coffee products:', error);
    //   }
    // );
    
  }
 
}
