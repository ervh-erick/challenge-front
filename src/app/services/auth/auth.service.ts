import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { API_CONFIG } from '../../config/api.config';
import { Credential } from '../../models/credential';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();
  user: User;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) { }


  authenticate(credential: Credential) {
    return this.http.post(`${API_CONFIG.baseUrl}/signin`, credential, {
      observe: 'response',
      responseType: 'text'
    });
  }

  success(response: HttpResponse<string> ) : void{
    this.user = JSON.parse(response.body);
    this.setAuthToken(this.user.token);
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  getAuthToken(): string | null {
    return localStorage.getItem("token");
  }

  isAuthenticated(): boolean{
    let token =  localStorage.getItem("token");
    if (token != null)
      return !this.jwtService.isTokenExpired(token);

    return false;
  }

  logout() {
    localStorage.clear();
  }

 }

