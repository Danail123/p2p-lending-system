import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NotificatorService {

  constructor(
    private readonly toastrService: ToastrService,
  ) { }

  public success(message: string) {
    this.toastrService.success(message);
  }

  public warn(message: string) {
    this.toastrService.warning(message);
  }

  public error(message: string) {
    this.toastrService.error(message);
  }
}
