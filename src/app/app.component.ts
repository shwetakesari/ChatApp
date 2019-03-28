import { Component , OnInit, OnDestroy} from '@angular/core';
import {Alert} from './classes/alert';
import { AlertService } from "./Services/alert-service.service";
import { LoadingService } from './Services/loading.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ChatApp';
  public alert: Array<Alert> = [];
  public loading: Boolean = false;
  private subscriptions : Subscription[] = [];

  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService){

  }

  ngOnInit(){

 
    this.subscriptions.push(
    this.alertService.alerts.subscribe(alert =>{
      this.alert.push(alert);
    }))
    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading =>{
        this.loading = isLoading;
      })
    )
    
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub=>{
      sub.unsubscribe();
    })
  }

}
