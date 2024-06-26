import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CoffeeProduct } from '../interfaces/coffee.inteface';
import { Observable } from 'rxjs';
import { CoffeeBeans } from '../interfaces/coffeeBean.interface';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  private baseUrl: string = environments.baseUrl
  cantidad: number  = 0;
  coffeeProducts: (CoffeeProduct | CoffeeBeans)[] = [];
  coffeeBeans : CoffeeBeans[] =[];


  constructor(
    private http: HttpClient

  ) {
    
  }

  getBeanProducts():Observable<CoffeeBeans[]>{
    return this.http.get<CoffeeBeans[]>('https://fake-coffee-api.vercel.app/api')
  }

  getProducts(): Observable<CoffeeProduct[]> {

    return this.http.get<CoffeeProduct[]>('https://api.sampleapis.com/coffee/hot')
  }

  getProductsByType(type: string){
   return this.http.get<CoffeeProduct[]>(`${this.baseUrl}/${type}`)
  }




  agregarCarrito(coffeeProduct: CoffeeProduct | CoffeeBeans) {

      this.coffeeProducts.push(coffeeProduct)
      localStorage.setItem('productos', JSON.stringify(this.coffeeProducts))
      // if(coffeeProduct != null){
      //   this.coffeeProducts.push(coffeeProduct)
      //   localStorage.setItem('productos', JSON.stringify(this.coffeeProducts))

      //  localStorage.setItem('productos', JSON.stringify(this.coffeeProducts))
      // }
      // if(coffeeBean!=null){
      //   this.coffeeBeans.push(coffeeBean)
      //   localStorage.setItem('productos', JSON.stringify(this.coffeeBeans))

      //   localStorage.setItem('productos', JSON.stringify(this.coffeeBeans))
      // }
      
      
  }

  // cargarCarrito():CoffeeProduct[]{

  //   if(localStorage.getItem('productos')){

  //     this.coffeeProduct = JSON.parse(localStorage.getItem('productos')!);
  //      for (const coffee of this.coffeeProduct) {
  //       this.cantidad = coffee.cantidad!;



  //     }

  //   }
  //  return this.coffeeProduct
  // }


  cargarCarrito(): (CoffeeProduct | CoffeeBeans)[] {
    const storedProducts = localStorage.getItem('productos');

    if (storedProducts) {
      const products: any[] = JSON.parse(storedProducts); // Parseando como array genérico

      // Limpiar el arreglo antes de cargar nuevos productos
      this.coffeeProducts = [];

      // Iterar sobre los productos almacenados
      products.forEach(product => {
        if ('ingredients' in product) {
          // Es un CoffeeProduct
          this.coffeeProducts.push({
            ...product,
            cantidad: product.cantidad || 1  // Establecer cantidad predeterminada si no está presente
          } as CoffeeProduct);
        } else if ('flavor_profile' in product) {
          // Es un CoffeeBeans
          this.coffeeProducts.push({
            ...product,
            cantidad: product.cantidad || 1  // Establecer cantidad predeterminada si no está presente
          } as CoffeeBeans);
        }
        // Puedes agregar más tipos de productos aquí según sea necesario
      });

    }

    return this.coffeeProducts;
  }

  borrarCarrito(){
    this.coffeeProducts = [];
    localStorage.removeItem('productos');
  }
}
