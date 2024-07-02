import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { ToasterService } from '../../../services/toaster/toaster.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})

export class UserUpdateComponent {

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

  firstName: FormControl = new FormControl(null, Validators.required);
  lastName: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  birthday: FormControl = new FormControl(null, Validators.required);
  login: FormControl = new FormControl(null, Validators.minLength(3));
  password: FormControl = new FormControl(null, Validators.minLength(3));
  confirmPassword: FormControl = new FormControl(null, Validators.minLength(3));
  phone: FormControl = new FormControl(null, Validators.minLength(5));

  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.userService.findById(this.user.id).subscribe(response => {
      this.user = response;
    });
  }

  update() {
    this.userService.update(this.user).subscribe(() => {
      this.toastr.success('User updated successfully', 'Update')
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

  validaCampos(): boolean {
    return this.firstName.valid && this.lastName.valid
     && this.login.valid && this.password.valid
     && this.birthday.valid && this.email.valid
     && this.phone.valid;
  }
}
