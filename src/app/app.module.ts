import { environment } from './../environments/environment'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// RXJS 
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';

// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireDatabaseModule } from '@angular/fire/database';






// APP Components
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavComponent } from './nav/nav.component';

import { NewProductComponent } from './product/new-product/new-product.component';

// APP Services
import { ProductService } from './product/product.service';
import { CategoryService } from './category.service';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { UploadService } from './product/upload.service';





@NgModule({
  declarations: [
    ProductComponent,
    AppComponent,
    NavComponent,
    NewProductComponent,
    EditProductsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: "", component: ProductComponent},
      { path: "product/new", component: NewProductComponent},
      { path: "products/edit", component: EditProductsComponent},
      { path: "**", redirectTo: '', pathMatch: 'full' }
    ])
  ],
  providers: [
    ProductService,
    CategoryService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
