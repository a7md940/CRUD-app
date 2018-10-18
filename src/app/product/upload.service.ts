import { Upload } from './upload';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';


export class UploadService {

    constructor(){}

    

    photoSelected(event){
        const file = event.target.files[0];
        let theurl;
        console.log(file.name+' '+file.type);
    
        const metaData = {'contentType': file.type};
        const storageRef = firebase.storage().ref();
    
        const imageFromStorage = storageRef.child('products/' + file.name);

        imageFromStorage.put(file,metaData).then( ()=>{
          const imgUrlref = storageRef.child('products/' + file.name);
        imgUrlref.getDownloadURL().then( url => { 
          theurl = url;
          console.log(theurl)
         }).catch( err => console.log('the error ' +err));
        });
        return theurl
      }
}