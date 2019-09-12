import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';;
import { RegisterComponent } from './register/register.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertModule } from './_alert';
import { ThanksSignupComponent } from './thanks-signup/thanks-signup.component';
import { ManageAuctionsComponent } from './manage-auctions/manage-auctions.component';
import { MustMatchDirective } from './_helpers/must-match.directive';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { MapDetailsComponent } from './map-details/map-details.component';
import { AuctionformComponent } from './auctionform/auctionform.component';
import { AuctionInfoComponent } from './auction-info/auction-info.component';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        AlertModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        PageNotFoundComponent,
        ThanksSignupComponent,
        ManageAuctionsComponent,
        MustMatchDirective,
        AuctionDetailComponent,
        LandingComponent,
        AdminComponent,
        MapDetailsComponent,
        AuctionformComponent,
        AuctionInfoComponent,
        EmailComponent,
        InboxComponent,
        SentComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }