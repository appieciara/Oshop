import { ShoppingCartItems } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart{
    items: ShoppingCartItems[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItems }) {
      this.itemsMap = itemsMap || {};
      for(let productId in itemsMap){
         let item = itemsMap[productId];
         let x = new ShoppingCartItems({
          //  title: item.title,
          //  imageUrl: item.imageUrl,
          //  price: item.price,
           ...item, //... is called spread operator in typerscript. this is equivalent to above three commented lines.
           $key: productId
         });
         //Object.assign(x, item); // target=x and source=item. Copies all properties from item Object to x Object.

         this.items.push(x);
      }
    } 
    
    get totalItemCount(){
      let count = 0;
      for(let productId in this.items){
            count += this.items[productId].quantity;
      }
      return count;
    }

    get getTotalPrice(){
      let sum = 0;
      for(let productId in this.items){
        sum += this.items[productId].totalPrice;
      }
      return sum;
    }

    getQuantity(product: Product){
     let item = this.itemsMap[product.$key];
     return item ? item.quantity : 0;
    }
}