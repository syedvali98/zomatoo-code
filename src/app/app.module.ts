import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DeatailedViewComponent } from './deatailed-view/deatailed-view.component';
import { ErrorComponent } from './error/error.component';

//custom Imports
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './http.service';
import 'hammerjs';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeatailedViewComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    NgxSpinnerModule,
    NgxGalleryModule,
    RouterModule.forRoot([
      {path:'home',component:HomeComponent},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'restaurant/:res_id',component:DeatailedViewComponent},
      {path:'**',component:ErrorComponent}

    ])
  ],
  providers: [CookieService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
