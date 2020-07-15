import { tap } from 'rxjs/operators';
// tslint:disable:next-line: variable-name
import { CreateUserDTO } from './../../features/users/models/create-user.dto';
import { CONFIG } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserDTO } from 'src/app/features/users/models/user.dto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
  ) { }

  // Only for Admins!
  allUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${CONFIG.MAIN_URL}/users`);
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${CONFIG.MAIN_URL}/users/${userId}`);
  }

  // Register a new User!
  createUser(user: CreateUserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${CONFIG.MAIN_URL}/users`, user);
  }

  // To ban user or admin! Main Admin cannot be banned! Need to be added description for ban and due.
  banUser(userId: string): Observable<UserDTO> {
    return this.http.patch<UserDTO>(`${CONFIG.MAIN_URL}/users/${userId}`, { action: 'Ban' });
  }

  // Not sure what is point of this :D
  unBanUser(userId: string): Observable<UserDTO> {
    return this.http.patch<UserDTO>(`${CONFIG.MAIN_URL}/users/${userId}`, { action: 'UnBan' });
  }

  deleteUser(userId: string): Observable<UserDTO> {
    return this.http.patch<UserDTO>(`${CONFIG.MAIN_URL}/users/${userId}`, { action: 'Delete' });
  }

  // Same like unBanUser, probably this not need.
  unDeleteUser(userId: string): Observable<UserDTO> {
    return this.http.patch<UserDTO>(`${CONFIG.MAIN_URL}/users/${userId}`, { action: 'UnDelete' });
  }
}
