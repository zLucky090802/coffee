import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import * as bcryptjs from 'bcryptjs'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  public isSubmitted = false;
  public user: User = { user: '', email: '', password: '' , roll: 'user'};
  public register = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, this.auth.validateEmail]],
    password: ['', [Validators.required, Validators.minLength(6)],this.auth.validatePassword],
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  registerUSer() {
    this.isSubmitted = true;
    if (this.register.valid) {

      this.user.id = uuidv4();
      console.log(this.user!.user = this.register.value.name!)
      this.user!.email = this.register.value.email!;
      this.user!.password = bcryptjs.hashSync(this.register.value.password!)
      this.user!.roll ='user'
      this.auth.registerUser(this.user!).subscribe(data => {
        this.router.navigateByUrl('auth/login')
      }
      )


    }
    this.register.markAllAsTouched();
  }
}
