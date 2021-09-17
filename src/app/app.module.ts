import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './service/authconfig.interceptor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SafePipeModule } from 'safe-pipe';

/*Customization Modules*/
import { MaterialModule } from './material.component';
import { StickyNavModule } from 'ng2-sticky-nav';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgImageSliderModule } from 'ng-image-slider';

/*NAVBAR module*/
import { NavbarComponent } from './nav/navbar.component'

/*App Pages*/
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { IdeasComponent } from './pages/ideas/ideas.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddMediaComponent } from './pages/add-media/add-media.component';
import { AlbumViewComponent } from './pages/album-view/album-view.component';

//Modal Components
  import { ImageModalComponent } from './pages/album-view/image-modal/image-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    IdeasComponent,
    NotFoundComponent,
    ProfileComponent,
    AddMediaComponent,
    AlbumViewComponent,
    ImageModalComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    StickyNavModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    NgImageSliderModule,
    ReactiveFormsModule,
    FormsModule,
    SafePipeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [ImageModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
