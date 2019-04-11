import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Attendance } from '../models/attendance';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  
  collectionName: string = "Attendance";
  constructor(private firestoreService: FirestoreService) {}

  get(date:string,teacherId:string){
    return this.firestoreService.colWithIds$<Attendance>(this.collectionName, ref => {
      return ref
        .where("Date", "==", date)
        .where("Teacher.Uid", "==", teacherId)
        .limit(20);
    }).pipe(first()).toPromise();
  }

  async markAttendance(data:Attendance) {
    return this.firestoreService.add<Attendance>(`${this.collectionName}`, data);
  }
}
