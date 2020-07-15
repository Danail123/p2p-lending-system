import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserViewComponent } from './user-view/user-view.component';

@NgModule({
  declarations: [AllUsersComponent, UserViewComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
