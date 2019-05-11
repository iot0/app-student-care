import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User, UserRole } from "../models/user";
import { map, tap, first } from "rxjs/operators";
import { AngularFirestoreCollection } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { FirestoreService } from "./firestore.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class UserService {
  collectionName: string = "Users";
  localKey: string = "user";
  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  currentUser$: Observable<User> = this.userSubject.asObservable();

  isLoggedIn$: Observable<boolean> = this.userSubject.asObservable().pipe(map(x => !!x));

  isSchool$: Observable<boolean> = this.currentUser$.pipe(
    map(x => {
      return x ? x.Role == UserRole.School : false;
    })
  );

  isTeacher$: Observable<boolean> = this.currentUser$.pipe(
    map(x => {
      return x ? x.Role == UserRole.Teacher : false;
    })
  );

  isParent$: Observable<boolean> = this.userSubject.asObservable().pipe(
    map(x => {
      return x ? x.Role == UserRole.Parent : false;
    })
  );

  userCollection: AngularFirestoreCollection<User>;
  constructor(private firestoreService: FirestoreService, public afAuth: AngularFireAuth) {
  }

  isAuthenticated(): boolean {
    if (this.userSubject.value) return true;
    return false;
  }

  currentUserObj(): User {
    return this.userSubject.value;
  }

  async register(user: User) {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(user.EmailId, user.Password);
    user.Uid = res.user.uid;
    this.firestoreService.set(`${this.collectionName}/${res.user.uid}`, user);
    return user;
  }

  async refreshUserDetails() {
    const userString = window.localStorage[this.localKey];
    if (userString != null && userString != "" && userString != "undefined") {
      try {
        let user = JSON.parse(userString);
        if (user && user.Uid) {
          user = await this.getUserDetailsAsAsync(user.Uid);
          window.localStorage[this.localKey] = JSON.stringify(user);
          this.userSubject.next(user);
          return true;
        }
      } catch (err) {
        this.clearUserJwt();
        return false;
      }
    }
    this.clearUserJwt();
    return false;
  }

  
  clearUserJwt() {
    this.userSubject.next(null);
    window.localStorage.removeItem(this.localKey);
  }

  async login(user: User) {
    const res = await this.afAuth.auth.signInWithEmailAndPassword(user.EmailId, user.Password);
    user.Uid = res.user.uid;

    // get user details

    let userDoc = await this.getUserDetailsAsAsync(user.Uid);

    window.localStorage[this.localKey] = JSON.stringify(userDoc);
    this.userSubject.next(userDoc);

    return userDoc;
  }

  getFamilies(studentId: string): Observable<any> {
    return this.firestoreService.colWithIds$<User>(this.collectionName, ref => {
      return ref
        .where("Role", "==", UserRole.Parent)
        .where("Student.Uid", "==", studentId)
        .limit(20);
    });
  }

  async getUserDetailsAsAsync(uid: string) {
    return await this.firestoreService
      .doc$<User>(`${this.collectionName}/${uid}`)
      .pipe(first())
      .toPromise();
  }
  getUserDetails(docId: string) {
    return this.firestoreService.docWithId$(`${this.collectionName}/${docId}`);
  }

  async logOut() {
    const user = window.localStorage[this.localKey];
    if (user != null) await this.afAuth.auth.signOut();
    this.clearUserJwt();
  }

  getById(docId: string) {
    return this.firestoreService.docWithId$(`${this.collectionName}/${docId}`);
  }
  updateDoc(updatedUser, docId): any {
    return this.firestoreService.update(`${this.collectionName}/${docId}`, updatedUser);
  }
  getTeachers(schoolId: string): Observable<any> {
    return this.firestoreService.colWithIds$<User>(this.collectionName, ref => {
      return ref
        .where("Role", "==", UserRole.Teacher)
        .where("SchoolId", "==", schoolId)
        .limit(20);
    });
  }

  getStudents(schoolId: string): Observable<any> {
    return this.firestoreService.colWithIds$<User>(this.collectionName, ref => {
      return ref
        .where("Role", "==", UserRole.Student)
        .where("SchoolId", "==", schoolId)
        .limit(20);
    });
  }

  getTeacherStudents(teacherId: string): Observable<any> {
    return this.firestoreService.colWithIds$<User>(this.collectionName, ref => {
      return ref
        .where("Role", "==", UserRole.Student)
        .where("Teacher.Uid", "==", teacherId)
        .limit(20);
    });
  }

  getTeacherWatchingDevices(teacherId:string){
    return this.firestoreService.colWithIds$<User>(this.collectionName, ref => {
      return ref
        .where("Role", "==", UserRole.Student)
        .where("IsTeacherWatching", "==", true)
        .where("Teacher.Uid", "==", teacherId)
        .limit(20);
    });
  }
  getParentWatchingDevices(studentId:string){
    return this.firestoreService.colWithIds$<User>(this.collectionName, ref => {
      return ref
        .where("Role", "==", UserRole.Student)
        .where("IsParentWatching", "==", true)
        .where("Uid", "==", studentId)
        .limit(1);
    });
  }
  async watchStudentByTeacher(studentId: string,ip:string) {
    return this.firestoreService.update<User>(`${this.collectionName}/${studentId}`, { IsTeacherWatching: true ,DeviceIp:ip});
  }
  async unWatchStudentTeacher(studentId: string) {
    return this.firestoreService.update(`${this.collectionName}/${studentId}`, { IsTeacherWatching: false });
  }
  async watchStudentByParent(studentId: string,ip:string) {
    return this.firestoreService.update<User>(`${this.collectionName}/${studentId}`, { IsParentWatching: true ,DeviceIp:ip});
  }
  async unWatchStudentParent(studentId: string) {
    return this.firestoreService.update(`${this.collectionName}/${studentId}`, { IsParentWatching: false });
  }
}
