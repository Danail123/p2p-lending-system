import { InvestmentModule } from './features/investment-screen/investment.module';
import { ErrorInterceptor } from './interceptors/error-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './components/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner-interceptor.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { Interceptors } from './interceptors';
import { ViewAllRequestsComponent } from './features/investment-screen/all-requests/get-all-requests/view-all-requests.component';
import { UserSummaryModule } from './features/user-summary/user-summary.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UserSummaryComponent } from './features/user-summary/user-summary-component/user-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { StorageService } from './core/services/storage.service';
import { TokenInterceptorService } from './interceptors/token-interceptor.serice';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ActiveLoanService } from './core/services/active-loan.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    ServerErrorComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    NgxSpinnerModule,
    JwtModule.forRoot({ config: {} }),
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    UserSummaryModule,
    InvestmentModule,
     
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    Interceptors,
    HttpClientModule,
    AuthService,
    StorageService,
    
    
    {
      provide: MatDialogRef,
      useValue: {}
    },

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
