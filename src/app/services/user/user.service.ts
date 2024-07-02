import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { User } from '../../models/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  create(user: User): Observable<User> {
    return this.http.post<User>(`${API_CONFIG.baseUrl}/users`, user);
  }

  findById(id: any): Observable<User> {
    console.log(this.authService.getAuthToken())
    return this.http.get<User>(`${API_CONFIG.baseUrl}/users/${id}`, this.authService.getHeaderAuth());
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/users`, this.authService.getHeaderAuth());
  }

  findByMe(): Observable<User> {
    console.log(this.authService.getAuthToken())
    return this.http.get<User>(`${API_CONFIG.baseUrl}/me`, this.authService.getHeaderAuth());
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/users/${user.id}`, user, this.authService.getHeaderAuth());
  }

  delete(id: any): Observable<User> {
    return this.http.delete<User>(`${API_CONFIG.baseUrl}/users/${id}`, this.authService.getHeaderAuth());
  }
}
