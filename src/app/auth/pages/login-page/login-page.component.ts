import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import * as bcryptjs from 'bcryptjs'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private user?:User;
  public myFormGroup = this.fb.group({
    user:['',[Validators.required,Validators.email]],
    password:['',[Validators.required, ]]
  })

  constructor(
    private authService:AuthService,
    private router: Router,
    private fb: FormBuilder
    ){}

  onSignIn():void{

  if(this.myFormGroup.valid){

   

    this.authService.login(this.myFormGroup.value.user!)
    .subscribe(data =>{
      if (data[0] && data[0].email) {
        this.user = data[0]
        
      }
      console.log(bcryptjs.compareSync(this.myFormGroup.value.password!,this.user!.password))
      if(bcryptjs.compareSync(this.myFormGroup.value.password!,this.user!.password)) {
        localStorage.setItem('token','jnfosnoifsfoijsioenioe')
        this.router.navigateByUrl('payment');
      }
      
    })
  }

  }
}
