import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { Car } from '../../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${API_CONFIG.baseUrl}/cars`);
  }
}
