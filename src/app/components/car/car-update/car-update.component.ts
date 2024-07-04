import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../../models/car';
import { ToasterService } from '../../../services/toaster/toaster.service';
import { CarService } from './../../../services/car/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent implements OnInit{
  car: Car = {
    licensePlate: '',
    color: '',
    model: '',
    year: ''
  }

  constructor(
    private carService: CarService,
    private toastr: ToasterService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  licensePlate: FormControl = new FormControl(null, Validators.minLength(3));
  color: FormControl = new FormControl(null, Validators.minLength(3));
  model: FormControl = new FormControl(null, Validators.minLength(3));
  year: FormControl = new FormControl(null, Validators.minLength(4));


  ngOnInit(): void {
    this.car.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.carService.findById(this.car.id).subscribe(response => {
      this.car = response;
    });
  }

  update() {
    this.carService.update(this.car).subscribe(() => {
      this.toastr.success('Car updated successfully', 'Update');
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

  back(){
        this.router.navigate(['cars'])
  }

  validaCampos(): boolean {
    return this.licensePlate.valid && this.year.valid
     && this.color.valid && this.model.valid
  }

}
