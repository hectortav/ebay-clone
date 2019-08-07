import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {title: 'Welcome to eLagoon!'} },
  { path: 'login', component: LoginComponent, data: {title: 'Log In'} },
  { path: 'register', component: RegisterComponent, data: {title: 'Sign Up'} },
  { path: 'about-page', component: AboutPageComponent, data: {title: 'About Us'} },

  // Should be the last route
  { path: '**', component: PageNotFoundComponent, data: {title: 'Error :('} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, RegisterComponent, PageNotFoundComponent]
