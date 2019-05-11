import { Injectable } from "@angular/core";
import { FirestoreService } from "./firestore.service";
import { User } from "../models/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AppNotification } from "../models/notification";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  collectionName: string = "Notifications";
  constructor(private firestoreService: FirestoreService, public afAuth: AngularFireAuth) {}

  async createNotification(data: AppNotification) {
    return await this.firestoreService.add(`${this.collectionName}`, data);
  }

  getParentItems(studentId: string) {
    return this.firestoreService.colWithIds$<User>(this.collectionName, ref => {
      return ref.where("Student.Uid", "==", studentId).limit(20);
    });
  }

  getTeacherStudentItems(teacherId: string, studentId: string) {
    return this.firestoreService.colWithIds$<User>(this.collectionName, ref => {
      return ref
        .where("Teacher.Uid", "==", teacherId)
        .where("Student.Uid", "==", studentId)
        .limit(20);
    });
  }

  updateReadStatus(docId) {
    return this.firestoreService.update<Notification>(`${this.collectionName}/${docId}`, { IsRead: true });
  }
}
