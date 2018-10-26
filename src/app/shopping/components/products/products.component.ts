import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[]=[];
  selectedCategory:string;
  filteredProduct: Product[] = [];
  cart$: Observable<ShoppingCart>;


  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  private populateProducts(){
    this.productService.getAll().pipe(switchMap(product => {
      this.products = product;
      return this.route.queryParamMap;
    }))     
    .subscribe(params => {
      this.selectedCategory = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter(){
    this.filteredProduct = (this.selectedCategory) ? this.products.filter(p => p.category === this.selectedCategory): this.products;

  }
}
