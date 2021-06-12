import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { IdeasComponent } from './pages/ideas/ideas.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


import { AuthGuard } from './service/auth/auth.guard'

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user-profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'ideas', component: IdeasComponent, canActivate: [AuthGuard]},
  { path: '404', component: NotFoundComponent},
  

  // otherwise redirect to 404 Error
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
