import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { environments } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.backendUrl;
  private user?: User;
  isSubmitted = false;

  private regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private http: HttpClient) { }

  validatePassword(control: AbstractControl): Observable<ValidationErrors | null> {
    const password = control.value;
    if (!password) {
      return of(null);
    }

    // Expresión regular para validar el formato de la contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!regex.test(password)) {
      return of({ invalidPasswordFormat: true });
    }

    return of(null); // La contraseña es válida
  }

  
  validateEmail(control: AbstractControl) {
    const email = control.value;
    if (!email) {
      return { required: true };
    }

    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { invalidEmail: true };
    }

    return null;
  }


  getUser():User | undefined{
   if(!this.user) return undefined;
   return structuredClone(this.user);
  }

  login(email: string):Observable<User[]>{

    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`)
  }

  registerUser(user:User){
    console.log(user)
    return this.http.post<User>(this.baseUrl,user)
    ;

  }



  checkAuthentication(): Observable<boolean> {
    const isAuthenticated = localStorage.getItem('token') !== null;

    return of(isAuthenticated)

  }

  logOut(){
    this.user = undefined;
    localStorage.clear();
  }

}
