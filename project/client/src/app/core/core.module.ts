import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NotificatorService } from './services/notificator.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { ToastrModule } from 'ngx-toastr';
import { ActiveLoanService } from './services/active-loan.service';
import { AuthService } from './services/auth.service';


@NgModule({
  providers: [
    UsersService,
    NotificatorService,
    AuthService,
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 30000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      countDuplicates: true,
    }),
  ],
  exports: [
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
