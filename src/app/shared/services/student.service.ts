import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  collectionName: string = "Students";
  constructor(private firestoreService: FirestoreService) {}

  register(data: Student) {
    return this.firestoreService.add(this.collectionName,data);
  } 

  get():any {
    return this.firestoreService.colWithIds$(this.collectionName,
      (q)=>{
        return q.limit(30).orderBy("CreatedAt",'desc')
      });
  }
}
