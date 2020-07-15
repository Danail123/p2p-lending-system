import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AnonymousGuard } from './core/guards/anonymous.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
    { path: 'investments', loadChildren: () => import('./features/investment-screen/investment.module').then(m => m.InvestmentModule) },
    

    { path: 'loans', loadChildren: () => import('./features/borrower-screen/borrower.module').then(m => m.BorrowerModule) },

    { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },

    { path: 'not-found', component: NotFoundComponent },
    { path: 'server-error', component: ServerErrorComponent },

    { path: '**', redirectTo: '/not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
