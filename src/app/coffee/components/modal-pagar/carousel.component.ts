import { Component, Input, OnInit } from '@angular/core';
import { CoffeeProduct } from '../../interfaces/coffee.inteface';

@Component({
  selector: 'modal-pagar-coffee',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  @Input() items: CoffeeProduct[]=[];
  public currentPosition = 0;

  ngOnInit(): void {
    this.items.map((i,index)=>{
      i.id = index;
      i.marginLeft = 0;
    })
  }

  setCurrentPosition(position:number){
    this.currentPosition = position;
    this.items.find(i=> i.id===0)!.marginLeft = -100 * position;
  }

  setNext(){
    let finalPercentage = 0;
    let nexposition = this.currentPosition +1;
    if(nexposition<=this.items.length -1){
      finalPercentage = -100 * nexposition;
    }else{
      nexposition = 0;
    }
    this.items.find(i=>i.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = nexposition;
  }

  setBack(){
    let finalPercentage = 0;
    let backPosition = this.currentPosition -1;
    if(backPosition >= 0){
      finalPercentage = -100 * backPosition;
    }else{
      backPosition = this.items.length-1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find(i=> i.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }

}
