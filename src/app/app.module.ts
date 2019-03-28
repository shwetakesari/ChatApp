
//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

//other modules

import {AlertModule} from 'ngx-bootstrap/alert';
import { NgxLoadingModule } from 'ngx-loading';
import * as firebase from 'firebase/app';



//gaurds
import {AuthGuard} from './guards/auth.guard';

//services
import { AlertService } from "./Services/alert-service.service";
import { AuthService } from "./Services/auth-service.service";
import { LoadingService } from "./Services/loading.service";

//components

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from './pages/chat/components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component'

@NgModule({
  declarations: [
     AppComponent,
     LoginComponent,
     SignupComponent,
     ChatComponent,
     NavbarComponent,
     ChatInputComponent,
     ChatroomListComponent,
     ChatroomTitleBarComponent,
     ChatMessageComponent,
     ChatroomWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    NgxLoadingModule
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFireStorageModule,
    // AngularFirestoreModule,
    // AngularFireDatabase
  ],
  providers: [LoadingService, AuthService, AlertService,LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
