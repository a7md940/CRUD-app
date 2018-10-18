import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
import { Product } from './product';

import { map } from 'rxjs/operators';

// import * as firebase from 'firebase';

@Injectable()

export class ProductService implements OnInit{
createProduct;
productsCollections: AngularFirestoreCollection<Product>;
productsDoc: AngularFirestoreDocument;
products: Observable<Product[]>;
DB;
    constructor(private afs: AngularFirestore, private db: AngularFireDatabase){

        this.productsCollections = this.afs.collection('products');
        // this.products = this.productsCollections.snapshotChanges().pipe(
        //     map(changes => {
        //         return changes.map(a =>{
        //             const data = a.payload.doc.data();
        //             data.id = a.payload.doc.id;
        //             return data;
        //         })
        //     })
        // )
       
            
    }

    ngOnInit(){
    
    }


    getProducts(){
        
        return this.afs.collection('products').valueChanges();
        
    }

    getProductWithSnapshot(){
        return this.afs
        .collection('products')
        .snapshotChanges().pipe(map(docArray =>{
            return docArray.map( doc =>{
                 return {
                     id: doc.payload.doc.id,
                     ...doc.payload.doc.data()
                 }
             });
         }))
        
       
    }
    
    
    create(product){
        
        this.afs.collection('products').add(product);
        
    }

    delete(product: Product){
        this.productsDoc = this.afs.doc('products/'+product.id);
        this.productsDoc.delete();
    }
   
    update(product){
        this.productsDoc = this.afs.doc('products/' + product.id);
        this.productsDoc.update(product);
    }


}