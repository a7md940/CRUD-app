import { Observable } from 'rxjs/observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';




@Injectable()
export class CategoryService {
  categoriesCollection: AngularFirestoreCollection<categories>;
  categories$: Observable<categories[]>;

  constructor(private afs:  AngularFirestore) {
    this.categories$ = this.afs.collection('categories').valueChanges();
   }

  getCategories(){
   return this.categories$;  
  }
}

interface categories {
  name?: string;
}

