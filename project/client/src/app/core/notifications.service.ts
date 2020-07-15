import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public success(message: string, title?: string): void {
    toastr.success(message, title);
  }


  public error(message: string, title?: string): void {
    toastr.error(message, title);
  }

  public warning(message: string, title?: string): void {
    toastr.warning(message, title);
  }

  public info(message: string, title?: string): void {
    toastr.info(message, title);
  }
}
