import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from '../classes/user';
import { Alert } from './../classes/alert';
import { AlertService } from './../Services/alert-service.service';
import { Observable ,of, from} from 'rxjs';
import { AlertType } from './../enums/alert-type.enum';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {switchMap} from 'rxjs/operators';
import { UserCredential } from '@firebase/auth-types';
import {User} from '@firebase/auth-types';


@Injectable()
export class AuthService {

  public currentUser: Observable<User | null>;
  private sign : Observable<boolean>
  private log : Observable<boolean>
  private userCredProm : Promise<UserCredential>

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {

    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
      
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    // this.sign = from()
    this.sign = from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-65bcf.appspot.com/o/default%20profile%20pic.jpg?alt=media&token=f820f1d2-8db6-4de6-a9f4-1e91a10fc246'
          }
          userRef.set(updatedUser);
          return true;
        })
        .catch((err) => false)
       
    );
    return this.sign;
     
  }

  public login(email: string, password: string): Observable<boolean> {
     this.log = from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
       
    );
    return this.log;
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out.'));
    });
  }
}
