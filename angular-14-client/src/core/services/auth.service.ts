import { HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/shared/models/user';
import { ErrorService } from './error.service';
import { ToastrService } from './toastr.service';
import { LoaderService } from './loader.service';
import { UserService } from './user.service';
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  readonly user$: Observable<User | null> = this.user.asObservable();
  private userData: any;

  constructor(
    private router: Router,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      id: user.id,
      email: user.email,
      name: user.displayName,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Send email verfificaiton when new user sign up
  // sendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u: any) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }


  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  // public login(email: string, password: string): Observable<User | null> {
  //   // const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=
  //   //              ${environment.firebase.apiKey}`;
  //   // const data = {
  //   //   email: email,
  //   //   password: password,
  //   //   returnSecureToken: true
  //   // };
  //   // const httpOptions = {
  //   //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   // };
  //   // this.loaderService.setLoading(true);

  //   // return this.http.post<User>(url, data, httpOptions).pipe(
  //   //   switchMap((data: any) => {
  //   //     const userId: string = data.localId;
  //   //     const jwt: string = data.idToken;
  //   //     // On sauvegarde les informations de connexion de l’utilisateur.
  //   //     this.saveAuthData(userId, jwt);
  //   //     return this.usersService.get(userId, jwt);
  //   //   }),
  //   //   tap(user => this.user.next(user)),
  //   //   tap(_ => this.logoutTimer(3600)), // On déclenche la minuterie !
  //   //   catchError(error => this.errorService.handleError(error)),
  //   //   finalize(() => this.loaderService.setLoading(false))
  //   // );
  //   const auth = this.userConnected();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential: { user: any; }) => {
  //       // Signed in 
  //       const user = userCredential.user;
  //       // ...
  //     })
  //     .catch((error: { code: any; message: any; }) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // public register(name: string, email: string, password: string): Observable<User | null> {
  //   // const auth = this.userConnected();
  //   // createUserWithEmailAndPassword(auth, email, password)
  //   //   .then((userCredential) => {
  //   //     // Signed up 
  //   //     const user = userCredential.user;
  //   //     // ...
  //   //   })
  //   //   .catch((error) => {
  //   //     const errorCode = error.code;
  //   //     const errorMessage = error.message;
  //   //     // ..
  //   //   });

  //   // const url =
  //   //   `${environment.firebase.auth.baseURL}/signupNewUser?key=
  //   //     ${environment.firebase.apiKey}`;

  //   // const data = {
  //   //   email: email,
  //   //   password: password,
  //   //   returnSecureToken: true
  //   // };

  //   // const httpOptions = {
  //   //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   // };

  //   // this.loaderService.setLoading(true);
  //   // return this.http.post<User>(url, data, httpOptions).pipe(
  //   //   switchMap((data: any) => {
  //   //     const jwt: string = data.idToken;
  //   //     const user = new User({
  //   //       email: data.email,
  //   //       id: data.localId,
  //   //       name: name
  //   //     });
  //   //     // On sauvegarde les informations de connexion de l’utilisateur provenant du serveur.
  //   //     this.saveAuthData(data.localId, jwt);
  //   //     return this.usersService.save(user, jwt);
  //   //   }),
  //   //   tap(user => this.user.next(user)),
  //   //   tap(_ => this.logoutTimer(3600)), // On déclenche la minuterie aussi !
  //   //   catchError(error => this.errorService.handleError(error)),
  //   //   finalize(() => this.loaderService.setLoading(false))
  //   // );
  // }

  // //   // Et on ajoute la méthode qui déclenche cette minuterie : 
  // private logoutTimer(expirationTime: number): void {
  //   of(true).pipe(
  //     delay(expirationTime * 1000)
  //   ).subscribe(_ => this.logout());
  // }

  // private saveAuthData(userId: string, token: string) {
  //   const now = new Date();
  //   const expirationDate = (now.getTime() + 3600 * 1000).toString();
  //   localStorage.setItem('expirationDate', expirationDate);
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('userId', userId);
  // }

  // autoLogin(user: User) {
  //   this.user.next(user);
  //   this.router.navigate(['app/dashboard']);
  // }

  // logout(): void {
  //   localStorage.removeItem('expirationDate');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userId');
  //   this.user.next(null);
  //   this.router.navigate(['/login']);
  // }

  // public updateUserState(user: User): Observable<User | null> {
  //   this.loaderService.setLoading(true);

  //   return this.usersService.update(user).pipe(
  //     tap(user => this.user.next(user)),
  //     tap(_ => this.toastrService.showToastr({
  //       category: 'success',
  //       message: 'Vos informations ont été mises à jour !'
  //     })),
  //     catchError(error => this.errorService.handleError(error)),
  //     finalize(() => this.loaderService.setLoading(false))
  //   );
  // }

  get currentUser(): User | null {
    return this.user.getValue();
  }
}
