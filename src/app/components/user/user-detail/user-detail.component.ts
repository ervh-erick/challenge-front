import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../../models/car';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

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
  ){}

  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.userService.findById(this.user.id).subscribe(response => {
      this.user = response;
      console.log(this.user.cars)
      this.dataSource = new  MatTableDataSource<Car>(this.user.cars);
    });
  }
}

