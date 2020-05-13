import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  customersRef: AngularFirestoreCollection<Item> = null;

  constructor(public fireservice: AngularFirestore) { 
    this.customersRef = fireservice.collection('item');
  }
  
  AddService(value){
    return this.fireservice.collection('item').add(value);
  }
  GetService(): AngularFirestoreCollection<Item> {
    return this.customersRef;
  }
}
