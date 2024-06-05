import { Injectable } from '@angular/core';
import { 
  Auth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signOut, 
  authState, 
  User, 
  fetchSignInMethodsForEmail 
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = authState(this.auth);
  }

  googleSignIn(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  emailSignIn(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signOut(): Observable<any> {
    return from(signOut(this.auth));
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }

  getUserName(): Observable<string | null> {
    return this.user$.pipe(
      map(user => user ? user.displayName : null)
    );
  }

  fetchSignInMethodsForEmail(email: string): Observable<string[]> {
    return from(fetchSignInMethodsForEmail(this.auth, email));
  }
}
