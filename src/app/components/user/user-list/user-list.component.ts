import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../models/user';
import { ToasterService } from '../../../services/toaster/toaster.service';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit{

  ELEMENT_DATA: User[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'login', 'email',  'birthday', 'phone', 'acoes'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private toastr: ToasterService
  ){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.userService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response
      this.dataSource = new  MatTableDataSource<User>(response);
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
