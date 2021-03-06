import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddMediaComponent } from './pages/add-media/add-media.component';
import { AlbumViewComponent } from './pages/album-view/album-view.component';
import { ListAllComponent } from './pages/list-all/list-all.component';

import { AuthGuard } from './service/auth/auth.guard'

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'album-view/:id', component: AlbumViewComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'add-media', component: AddMediaComponent, canActivate: [AuthGuard] },
  { path: 'list-all', component: ListAllComponent, canActivate: [AuthGuard] },
  { path: 'user-profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent},
  

  // otherwise redirect to 404 Error
  {path: '**', redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
