import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrl: './car-delete.component.css'
})
export class CarDeleteComponent implements OnInit{
  car: Car = {
    licensePlate: '',
    color: '',
    model: '',
    year: ''
  }

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.car.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.carService.findById(this.car.id).subscribe(response => {
    this.car = response;
    }), ex => {
      if(ex.error?.errors) {
        ex.error?.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error?.message);
      }
    };;
  }

  delete() {
    this.carService.delete(this.car.id).subscribe(() => {
      this.toastr.success('Car deleted successfully', 'Delete');
      this.router.navigate(['cars'])
    }, ex => {
      if(ex.error?.errors) {
        ex.error?.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error.message);
      }
    })
  }
}
