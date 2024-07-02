import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { ToasterService } from '../../../services/toaster/toaster.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent {

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    login: '',
    password: '',
    phone: '',
    createdAt:  '',
    lastLogin:  '',
    cars: []
  }

  constructor(
    private userService: UserService,
    private toastr: ToasterService,
    private router: Router,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.userService.findById(this.user.id).subscribe(response => {
      this.user = response;
    });
  }

  delete() {
    this.userService.delete(this.user.id).subscribe(() => {
      this.toastr.success('User deleted successfully', 'Delete');
      this.router.navigate(['users'])
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
}
