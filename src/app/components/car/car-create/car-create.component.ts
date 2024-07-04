import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car/car.service';
import { ToasterService } from '../../../services/toaster/toaster.service';
import { CONNREFUSED } from 'node:dns';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrl: './car-create.component.css'
})
export class CarCreateComponent implements OnInit {

  car: Car = {
    licensePlate: '',
    color: '',
    model: '',
    year: ''
  }

  constructor(
    private carService: CarService,
    private toastr: ToasterService,
    private router: Router
  ){}

  licensePlate: FormControl = new FormControl(null, Validators.minLength(3));
  color: FormControl = new FormControl(null, Validators.minLength(3));
  model: FormControl = new FormControl(null, Validators.minLength(3));
  year: FormControl = new FormControl(null, Validators.minLength(4));


  ngOnInit(): void {
  }

  create() {
    this.carService.create(this.car).subscribe(() => {
      this.toastr.success('Car registered successfully', 'Register');
      this.router.navigate(['cars'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error.message);
      }
    })
  }


  validaCampos(): boolean {
    return this.licensePlate.valid && this.year.valid
     && this.color.valid && this.model.valid
  }

  back() {
    this.router.navigate(['cars'])
  }

}
