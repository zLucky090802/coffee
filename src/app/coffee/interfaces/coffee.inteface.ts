// Generated by https://quicktype.io

export interface CoffeeProduct {
  title:       string;
  description: string;
  ingredients: string[];
  image:       string;
  id:          number;
  cantidad?:   number;
  price?:      number;
  order?:      number;
  marginLeft:  number;
  type: 'product'
}