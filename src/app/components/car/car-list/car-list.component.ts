import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit{

  ELEMENT_DATA: Car[] = [];

  displayedColumns: string[] = ['licensePlate', 'model', 'color', 'year', 'acoes'];
  dataSource = new MatTableDataSource<Car>(this.ELEMENT_DATA);

  constructor(
    private carService: CarService
  ){}

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  findAll(){
    this.carService.findAll().subscribe(response => {
      console.log(response)
      this.ELEMENT_DATA = response
      this.dataSource = new  MatTableDataSource<Car>(response);
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
