import { UploadService } from './../product/upload.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './../product/product';
import { ProductService } from './../product/product.service';
import * as firebase from 'firebase';
// import * as _ from 'lodash';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
  Products;

  currentDate = new Date().constructor().slice(0,21);

  editProductForm: boolean;
  editedProduct;

  deleteProductConfirm: boolean = false;
  productWantToDelete;
  showDeleteConfirmationModal: boolean = false;

  showImage: boolean = false;

  // ======= CONSTRUCTOR 
  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService) { }
  // ======= CONSTRUCTOR

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){

   this.Products =  this._productService.getProductWithSnapshot()
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

  uploadNewImage(event){
    console.log("this.editedProduct.imageUrl" + this.editedProduct.imageUrl)

      const file = event.target.files[0];
      const metaData = {'contentType': file.type};

      console.log(file.name+' '+file.type);

      const storageRef = firebase.storage().ref();
      const imageFromStorage = storageRef.child('products/' + file.name);

      imageFromStorage.put(file,metaData).then( ()=>{
        const imgUrlref = storageRef.child('products/' + file.name);
      imgUrlref.getDownloadURL().then( url => { 
        this.editedProduct.imageUrl = url;
        console.log(this.editedProduct.imageUrl)
       }).catch( err => console.log('the error ' +err));
      });
  }
  
  update(product){
    this._productService.update(product);
    // console.log(product)
    this.editProductForm = false;
    this.editedProduct = {};
  }

  cancel(product){
    this.editProductForm = false;
    console.log(product)

    this.editedProduct = {};
    product = {};
    console.log(product )
  }

  show(product){
    this.showImage = true;
    this.editedProduct = product;
  }
  hide(){
    this.showImage = false;

  }
  showNewProductForm(){

    this.editProductForm = false;
    
  }

}
