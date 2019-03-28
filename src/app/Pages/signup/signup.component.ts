import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertType } from './../../enums/alert-type.enum';
import { Alert } from './../../classes/alert';
import {AlertService} from './../../Services/alert-service.service';
import { Subscription } from 'rxjs';
import {LoadingService} from './../../Services/loading.service';

import { AuthService } from 'src/app/Services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private alertService : AlertService,
    private auth: AuthService, private router: Router, private loadingService: LoadingService) {
    this.createForm();
   }

  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName:['', [Validators.required]],
      lastName : ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    if(this.signupForm.valid){
      const {firstName, lastName, email, password} = this.signupForm.value;
        // TODO call the auth service
    this.subscriptions.push(this.auth.signup(firstName, lastName, email, password).subscribe(success=>{
      if(success){
        this.router.navigate['/chat'];
      }else{
        const signinFailedAlert =  new Alert("There was a problem signing up, Tryagain!", AlertType.Danger);
        this.alertService.alerts.next(signinFailedAlert); //trigger that alert
      }
      this.loadingService.isLoading.next(false);
    })
    )
    // console.log(`First Name: ${firstName}, Last Name: ${lastName},Email: ${email}, Password: ${password}`);
    }
    else{
      const signinFailedAlert = new Alert("Please provide valid details", AlertType.Danger);
      this.alertService.alerts.next(signinFailedAlert);
    }
    
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub=>{
      sub.unsubscribe();
    })
  }

}
