import { DEFAULT_USER_AVATAR_URL } from './../../../config/config';
import { UserDTO } from './../models/user.dto';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  @Input() user: UserDTO;

  userAvatarUrl = DEFAULT_USER_AVATAR_URL;
  banStatus: boolean;

  @Output() banUser: EventEmitter<UserDTO> = new EventEmitter();
  @Output() unBanUser: EventEmitter<UserDTO> = new EventEmitter();
  @Output() deleteUser: EventEmitter<UserDTO> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.banStatus = this.user.isBanned;
  }

  onClickBanUser(): void {
    this.banStatus = !this.banStatus;
    this.banUser.emit(this.user);
  }

  onClickUnBanUser(): void {
    this.banStatus = !this.banStatus;
    this.unBanUser.emit(this.user);
  }

  onClickDeleteUser(): void {
    this.deleteUser.emit(this.user);
  }
}
