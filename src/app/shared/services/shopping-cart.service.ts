import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  item: any;
 
  constructor(private db: AngularFireDatabase) { }

  create(){
    return  this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+ cartId).valueChanges().pipe(
      map(x => new ShoppingCart(x.items))
    );
  }

  async addToCart(product: Product){
    this.updateItem(product, 1);    
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async getOrCreateCartId():Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;     

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId, product){
    return this.db.object('/shopping-carts/'+ cartId + '/items/' + product.$key);
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId(); //if you want asynchronous data to act as synchonous 
    // use await and set function as async. For more info: 23_ Project - Shopping Cart Module - Video 3 05:20 onwards listen
    let item$ = this.getItem(cartId, product);
    // console.log(product);
    item$.valueChanges().pipe(take(1)).subscribe(item => {  //If you only want the subscribe callback to get called once, you'll need to use the rxjs take operator.
     if(item){
      let  quantity = item.quantity  + change;
        if(quantity === 0)
        {
          item$.remove();
        }else{
            item$.update({ title: product.title, price: product.price, imageUrl: product.imageUrl, quantity: quantity });
        }
    }else {
        item$.set({ title: product.title, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
    }
    });

  }

}
