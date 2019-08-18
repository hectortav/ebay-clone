import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ThanksSignupComponent } from './thanks-signup/thanks-signup.component';
import { ManageAuctionsComponent } from './manage-auctions/manage-auctions.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'thanks-signup', component: ThanksSignupComponent },
    { path: 'manage-auctions', component: ManageAuctionsComponent, canActivate: [AuthGuard] },
    { path: 'auction-detail/:id', component: AuctionDetailComponent },

    // Should be the last route, in order to redirect to 404 page
    { path: '**', component: PageNotFoundComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);