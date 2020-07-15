import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/user.dto';
import { UsersService } from 'src/app/core/services/users.service';
import { NotificatorService } from 'src/app/core/services/notificator.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: UserDTO[] = [];
  banStatus: boolean;

  constructor(
    private readonly usersService: UsersService,
    private readonly notificator: NotificatorService,
  ) { }

  ngOnInit() {
    this.usersService.allUsers().subscribe((users: UserDTO[]) => {
      this.users = users;
    });
  }

  banUser(user: UserDTO): void {
    this.usersService.banUser(user.id).subscribe(
      (bannedUser: UserDTO) => {
        this.notificator.success(`${bannedUser.username} is banned successful!`);
        this.banStatus = bannedUser.isBanned;
      }
    );
  }

  unBanUser(user: UserDTO): void {
    this.usersService.unBanUser(user.id).subscribe(
      (unBannedUser: UserDTO) => {
        this.notificator.success(`${unBannedUser.username} is Unbanned successful!`);
      }
    );
  }

  deleteUser(user: UserDTO): void {
    this.usersService.deleteUser(user.id).subscribe(
      (deletedUser: UserDTO) => {
        this.notificator.success(`${deletedUser.username} is deleted successful!`);
        this.users = this.users.filter((validUser: UserDTO) => validUser.id !== deletedUser.id);
      }
    );
  }

}
