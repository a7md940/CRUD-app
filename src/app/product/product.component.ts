import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit {
  Products;

  newProductForm: boolean = false;
  newProduct: any={};

  editProductForm: boolean;
  editedProduct;

  deleteProductConfirm: boolean = false;
  productWantToDelete;
  showDeleteConfirmationModal: boolean = false;

  showImage: boolean = false;
  constructor(private _productService: ProductService) { 
    
 
  }
  
  ngOnInit() {
    this.Products = this._productService.getProducts();
   
  }


  getProducts(){
     this._productService.getProducts().subscribe(products =>{
       this.Products = products;
       console.log(this.Products);
    });
  }


  deleteConfirm(product){
    this._productService.delete(product);
    this.showDeleteConfirmationModal = false;
  }
  deleteCancel(){
    this.showDeleteConfirmationModal = false;
  }

  deleteProduct(product: Product){
    this.showDeleteConfirmationModal = true;
    this.productWantToDelete = product;
    console.log(this.productWantToDelete)

  }

  updateProduct(product){
    this.editProductForm = true;
    this.editedProduct = product;
  }
  update(product){
    this._productService.update(product);
    console.log(product)
    this.editProductForm = false;
    this.editedProduct = {};
  }

  cancel(){
    this.editProductForm = false;
    this.editedProduct = {};
  }

  show(product){
    this.showImage = true;
    this.editedProduct = product;
  }
  hide(){
    this.showImage = false;

  }
  showNewProductForm(){
    this.newProductForm = true;
    this.editProductForm = false;
    
  }
}
