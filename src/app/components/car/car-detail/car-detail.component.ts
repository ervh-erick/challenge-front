import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit{
  car: Car = {
    licensePlate: '',
    color: '',
    model: '',
    year: ''
  }

  constructor(
    private carService: CarService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.car.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.carService.findById(this.car.id).subscribe(response => {
    this.car = response;
    });
  }
}
