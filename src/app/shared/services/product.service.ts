import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products/').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes => {
      return changes.map(a => {
        const data = a.payload.val() as Product;
        data.$key = a.payload.key;
        return data;
      });
    })); 
  }  

  get(productId){
    return this.db.object('/products/'+ productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }


}
