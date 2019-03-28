import { Component, OnInit} from '@angular/core';
import {OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertType } from './../../enums/alert-type.enum';
import { Alert } from './../../classes/alert';
import {AlertService} from './../../Services/alert-service.service';
import {LoadingService} from '../../Services/loading.service';
import {Subscription} from 'rxjs';
import {AuthService} from './../../Services/auth-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscriptions: Subscription[];
  private returnURL : string;

  constructor(private fb: FormBuilder,
     private alertService : AlertService, private loadingService : LoadingService,private auth: AuthService,
     private router: Router, private route: ActivatedRoute) {
    this.createForm();
   }

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] ||'/chat;'
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    
    if(this.loginForm.valid){
      this.loadingService.isLoading.next(true);
       // TODO call the auth service
    const {email, password} = this.loginForm.value

    this.subscriptions.push(
      this.auth.login(email,password).subscribe(success =>{
        if(success){
          this.router.navigateByUrl(this.returnURL);
        }
          this.loadingService.isLoading.next(false);
      })
    );
    // console.log(`Email: ${email}, Password: ${password}`);
    // this.loadingService.isLoading.next(false);
    }
    else{
      const loginFailedAlert = new Alert("Id or password is incorrect", AlertType.Danger);
      // setTimeout(()=> {
        this.loadingService.isLoading.next(false);
      this.alertService.alerts.next(loginFailedAlert);
      // }, 2000)
    }
   
  }

ngOnDestroy(){
  // this.subscriptions.forEach(sub=> 
  //   sub.unsubscribe());
}
}
