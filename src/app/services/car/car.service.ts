import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { Car } from '../../models/car';
import { AuthService } from './../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  findAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${API_CONFIG.baseUrl}/cars`, this.authService.getHeaderAuth());
  }

  create(car: Car): Observable<Car> {
    return this.http.post<Car>(`${API_CONFIG.baseUrl}/cars`, car, this.authService.getHeaderAuth());
  }

  findById(id: any): Observable<Car> {
    return this.http.get<Car>(`${API_CONFIG.baseUrl}/cars/${id}`, this.authService.getHeaderAuth());
  }

  update(car: Car): Observable<Car> {
    return this.http.put<Car>(`${API_CONFIG.baseUrl}/cars/${car.id}`, car, this.authService.getHeaderAuth());
  }

  delete(id: any): Observable<Car> {
    return this.http.delete<Car>(`${API_CONFIG.baseUrl}/cars/${id}`, this.authService.getHeaderAuth());
  }
}
