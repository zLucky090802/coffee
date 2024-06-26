import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CoffeeService } from '../../services/coffee-service.service';
import { CoffeeProduct } from '../../interfaces/coffee.inteface';
import { ModalService } from '../../services/modal-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { CoffeeBeans } from '../../interfaces/coffeeBean.interface';


@Component({
  selector: 'shopping-cart-coffee',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  private productos: (CoffeeProduct | CoffeeBeans)[] = [];
  public coffeeFilter: CoffeeProduct[] = [];
  public coffeeFilterBean: CoffeeBeans[] = []
  public BeanProducts: CoffeeBeans [] = [];
  public subtotal: number = 0;
  public cantidad: number = 0
  public cantidadAnterior: number = 0;
  public btnEnable: boolean = false;
  public localExist: boolean = false;


  constructor(
    private coffeeService: CoffeeService,
    private ModalService: ModalService,
    public dialog: MatDialog
  ) {

    
  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

    if(localStorage.getItem('productos')){
      this.localExist = true
      this.cargarProductos();
      
    }else{
     this.localExist = false
    }
    





  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalComponent,);
  }

  cargarProductos() {
    this.productos = this.coffeeService.cargarCarrito();
  
    for (let i = 0; i < this.productos.length; i++) {
      if ('image_url' in this.productos[i]) {
        // Es un CoffeeBeans
        this.coffeeFilterBean.push(this.productos[i] as CoffeeBeans);
        this.subtotal += this.productos[i].price!;
      } else {
        // Es un CoffeeProduct
        this.coffeeFilter.push(this.productos[i] as CoffeeProduct);
        this.subtotal += this.productos[i].price! * this.productos[i].cantidad!;
      }
    }
    

  }

  delete(index: number, type:string) {

    if(type==='product'){
      this.cantidadCarrito(-this.coffeeFilter[index].cantidad!)
      this.coffeeFilter.splice(index,1)
    }
    if(type==='bean'){
      this.cantidadCarrito(-this.coffeeFilterBean[index].cantidad)
      this.coffeeFilterBean.splice(index,1)
    }
    
    this.update();
    // Actualizar el localStorage después de eliminar el producto
    localStorage.setItem('productos', JSON.stringify(this.productos));
    if(this.coffeeFilter.length=== 0 && this.coffeeFilterBean.length== 0){
      this.localExist = false
    }
  }
  
  
  

  


  
  
  update(){
    this.productos.splice(0, this.productos.length);
    this.productos = [...this.coffeeFilter, ...this.coffeeFilterBean];

    // Actualizar productos en localStorage
    localStorage.setItem('productos', JSON.stringify(this.productos));
  
    // También puedes actualizar this.productos si es necesario
   
  }
  

  aumentarCarrito(i: number) {



    //   this.coffeeFilter[i].cantidad! += 1;

    //   // this.cantidad += 1;

    //   if (this.cantidad <= 1) {
    //     this.cantidad +=1 ;
    // } else {
    //     this.cantidad += (this.cantidad - 1) - (this.cantidad - 2);
    // }
    //   this.subtotal += this.coffeeFilter[i].price!;
    //  this.cantidadCarrito(this.cantidad)
    //  this.coffeeService.borrarCarrito();
    //  this.agregarCarrito(this.coffeeFilter);
    this.coffeeFilter[i].cantidad! += 1;






    this.cantidad += 1;
    this.subtotal += this.coffeeFilter[i].price!;
    this.cantidadCarrito(1);
    this.coffeeService.borrarCarrito();
    this.agregarCarrito(this.coffeeFilter);



  }

  decrementarCarrito(i: number) {

    if (this.coffeeFilter[i].cantidad! > 1) {
      this.coffeeFilter[i].cantidad! -= 1;
      this.subtotal -= this.coffeeFilter[i].price!;

      this.cantidad -= 1;
      this.cantidadCarrito(-1);
    this.coffeeService.borrarCarrito();
    this.agregarCarrito(this.coffeeFilter);







    }
    if(this.coffeeFilter[i].cantidad! <= 1){
      this.btnEnable = false;
      console.log(this.btnEnable)
    }

  }

  cantidadCarrito(i: number) {
    this.ModalService.agregar(i)
  }

  reset() {
    for(let producto  of this.coffeeFilter){
      this.cantidad
    }
    this.cantidad = 0
    this.cantidadCarrito(this.cantidad)
    this.coffeeService.borrarCarrito();
  }

  agregarCarrito(coffee: CoffeeProduct[]) {


    localStorage.setItem('productos', JSON.stringify(coffee))
  }


}


