import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product';
import { Observable } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  categories$;
  imageUrl;
  showImage= false;

  constructor(
    private router: Router,
    private CategoryService: CategoryService,
    private ProductService: ProductService,
    private db: AngularFireDatabase) { 

  }
  ngOnInit() {
    this.categories$ = this.CategoryService.getCategories();
  }

  save(product: Product){

      this.ProductService.create(product);
      console.log(product);
      this.router.navigate(['/'])
  }

  photoSelected(event){
    const file = event.target.files[0];
    console.log(file.name+' '+file.type);

    const metaData = {'contentType': file.type};
    const storageRef = firebase.storage().ref();

    const imageFolder = storageRef.child('products/');
    const imageFromStorage = storageRef.child('products/' + file.name);
    imageFromStorage.put(file,metaData).then( ()=>{
      const imgUrlref = storageRef.child('products/' + file.name);
    imgUrlref.getDownloadURL().then( url => { 
      console.log(url);
      this.imageUrl = url;
      this.showImage= true;
     }).catch( err => console.log(err));
    } );
    
  }

}
