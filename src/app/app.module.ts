import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*Customization Modules*/
import { MaterialModule } from './material.component';
import { StickyNavModule } from 'ng2-sticky-nav';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgImageSliderModule } from 'ng-image-slider';

/*App Pages*/
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { IdeasComponent } from './pages/ideas/ideas.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    IdeasComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    StickyNavModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
