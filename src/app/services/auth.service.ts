import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>; 

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  googleSignIn(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider(); 
    return this.afAuth.signInWithRedirect(provider);
  }

  emailSignIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  getUserDisplayName(): Observable<string | null> {
    return this.user$.pipe(
      map(user => user ? user.displayName : null)
    );
  }
}
