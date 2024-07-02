import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster/toaster.service';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToasterService
  ){}

  ngOnInit(): void {
    this.router.navigate(['cars']);
  }

  logout() {
    this.router.navigate(['signin']);
    this.authService.logout();
    this.toastr.info('Logout completed successfully.', 'Logout')
   }

}
