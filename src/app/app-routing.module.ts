import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CarCreateComponent } from './components/car/car-create/car-create.component';
import { CarDeleteComponent } from './components/car/car-delete/car-delete.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserMeComponent } from './components/user/user-me/user-me.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'register', component: UserCreateComponent},

  {
    path:'', component: NavComponent, canActivate: [AuthGuard], children: [
      {path: 'home', component: HomeComponent},
      {path: 'cars', component: CarListComponent },
      {path: 'cars/create', component: CarCreateComponent },
      {path: 'cars/update/:id', component: CarUpdateComponent },
      {path: 'cars/detail/:id', component: CarDetailComponent },
      {path: 'cars/delete/:id', component: CarDeleteComponent },
      {path: 'me', component: UserMeComponent },
      {path: 'users', component: UserListComponent },
      {path: 'users/update/:id', component: UserUpdateComponent },
      {path: 'users/delete/:id', component: UserDeleteComponent },
      {path: 'users/detail/:id', component: UserDetailComponent }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
