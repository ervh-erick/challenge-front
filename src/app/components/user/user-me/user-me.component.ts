import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../../models/car';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-me',
  templateUrl: './user-me.component.html',
  styleUrl: './user-me.component.css'
})
export class UserMeComponent implements OnInit{
  ELEMENT_DATA: Car[] = []
  displayedColumns: string[] = ['licensePlate', 'model', 'color', 'year'];
  dataSource = new MatTableDataSource<Car>(this.ELEMENT_DATA);

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    birthday: Date().toLocaleString(),
    login: '',
    password: '',
    phone: '',
    createdAt: Date().toLocaleString(),
    lastLogin: Date().toLocaleString(),
    cars: []
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.findMe();
  }

  findMe(): void{
    this.userService.findByMe().subscribe(response => {
      this.user = response;
      console.log(this.user.cars)
      this.dataSource = new  MatTableDataSource<Car>(this.user.cars);
    });
  }
}

