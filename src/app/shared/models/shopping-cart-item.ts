import { Product } from "./product";

export class ShoppingCartItems{
    title: string;
    $key: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItems>){  //for more details video no. 337 time: 2:48 onwards
        Object.assign(this, init ); //target = this and source = init
     }  

    get totalPrice(){
        return this.quantity * this.price;
    }
} 