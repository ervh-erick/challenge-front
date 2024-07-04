import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car/car.service';
import { ToasterService } from '../../../services/toaster/toaster.service';

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
    private route: ActivatedRoute,
    private toastr: ToasterService
  ){}

  ngOnInit(): void {
    this.car.id = this.route.snapshot.paramMap.get('id');
    this.findById(), ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error.message);
      }
    };;
  }

  findById(): void{
    this.carService.findById(this.car.id).subscribe(response => {
    this.car = response;
    }), ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error.message);
      }
    };;
  }
}
