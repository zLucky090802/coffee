import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CoffeeProduct } from '../../interfaces/coffee.inteface';
import { ModalService,  } from '../../services/modal-service.service';
import { CoffeeBeans } from '../../interfaces/coffeeBean.interface';

@Component({
  selector: 'card-coffee',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public coffeeProduct!: CoffeeProduct;

  @Input()
  public coffeeBeans!: CoffeeBeans;

  public valor = 2

  constructor(private modalService:ModalService){

  }

  ngOnInit(): void {
    
    // if(!this.coffeeProduct) throw new Error('No se han podido cargar los productos');
    // if(!this.coffeeBeans) throw new Error('no se han podido cargar los productos')
    
  }

  open(coffee: CoffeeProduct | CoffeeBeans){
    this.modalService.openModal(coffee)
    
  }
}
