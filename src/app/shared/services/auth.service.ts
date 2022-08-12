import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import * as auth from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['feature']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return user !== null ? true : false;
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendEmailVerification();
        this.setUserData(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  sendEmailVerification() {
    return this.afAuth.currentUser
      .then((user) => {
        user?.sendEmailVerification();
      })
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  forgotPassword(passResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passResetEmail)
      .then(() => {
        console.log('email was sent');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['feature']);
      }
    });
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['feature']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth', 'sign-in']);
    });
  }
}
