import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;

  constructor(private shoppingCartService: ShoppingCartService,private  productService: ProductService) { }

  async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart(); 
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }
}
