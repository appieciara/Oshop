import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$; //Please note the dollar sign.
              // Using the dollar sign in the name of a variable that is an observable, is considered best practice. 
              //This way it’s easy to identify if your variable is an observable or not.
  product = {};  // must be initialized to empty.
  id;

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) { 
    this.categories$ = this.categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p=> this.product = p );

  }

  ngOnInit() {
  }

  save(product){ 
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sre you want to delete this product?')) return ;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  
}
