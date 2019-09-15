import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard, RoleGuard } from './_helpers';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ThanksSignupComponent } from './thanks-signup/thanks-signup.component';
import { ManageAuctionsComponent } from './manage-auctions/manage-auctions.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { UserInfoComponent } from './user-info/user-info.component'

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'thanks-signup', component: ThanksSignupComponent },
    { path: 'manage-auctions', component: ManageAuctionsComponent, canActivate: [AuthGuard] },
    { path: 'auction-detail/:id', component: AuctionDetailComponent },
    { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
    { path: 'admin/users/:id', component: UserInfoComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
    {
        path: 'email', component: EmailComponent, canActivate: [AuthGuard],
        children: [
            { path: 'inbox', component: InboxComponent },
            { path: 'sent', component: SentComponent },
            { path: '', redirectTo: 'inbox', pathMatch: 'full' }
        ]
    },

    // Should be the last route, in order to redirect to 404 page
    { path: '**', component: PageNotFoundComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });