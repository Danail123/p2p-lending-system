import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
    { path: '', component: AllUsersComponent, pathMatch: 'full', canActivate: [AuthGuard, AdminGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
