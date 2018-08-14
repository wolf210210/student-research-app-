import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

// import crate valitation file 
import  {ValidateService} from './services/validate.service';
import  {AuthService} from './services/auth.service';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { VideoCenterComponent } from './components/video-center/video-center.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { SafePipe } from './safe.pipe';
import { DashboardDetailComponent } from './components/dashboard-detail/dashboard-detail.component';

const appRoutes : Routes =[
  {path:'',component :HomeComponent},
  {path:'register',component :RegisterComponent},
  {path:'login',component :LoginComponent},
  {path:'dashboard',component :DashboardComponent},
  {path:'profile',component :ProfileComponent},
  {path:'video',component :VideoCenterComponent},
  {path:'DashboardDetails',component :DashboardDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SideBarComponent,
    VideoCenterComponent,
    VideoDetailComponent,
    VideoListComponent,
    SafePipe,
    DashboardDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),


  ],
  providers: [ValidateService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
