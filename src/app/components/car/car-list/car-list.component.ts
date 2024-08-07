import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car/car.service';
import { ToasterService } from '../../../services/toaster/toaster.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit{

  ELEMENT_DATA: Car[] = [];

  displayedColumns: string[] = ['licensePlate', 'model', 'color', 'year', 'acoes'];
  dataSource = new MatTableDataSource<Car>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private carService: CarService,
    private toastr: ToasterService
  ){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.carService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response
      this.dataSource = new  MatTableDataSource<Car>(response);
      this.dataSource.paginator = this.paginator;
    },  ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error.message);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
