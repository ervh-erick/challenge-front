export class User{
  id: string;
  firstName : string;
  lastName : string;
  email : string;
  birthday : Date;
  login : string;
  password : string;
  phone : string;
  createdAt : Date;
  lastLogin : Date;
  cars : any;
  token: string;

  constructor(
    id: string,
    firstName : string,
    lastName : string,
    email : string,
    birthday : Date,
    login : string,
    password : string,
    phone : string,
    createdAt : Date,
    lastLogin : Date,
    cars : any,
    token: string
  )
{}

}
