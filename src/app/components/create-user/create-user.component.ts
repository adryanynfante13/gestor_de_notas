import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/services/user-i';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
  
})
export class CreateUserComponent implements OnInit {

  formCreate: FormGroup = new FormGroup({});
  
  user: UserI = {
    id: '',
    fullName: '',
    dni: '',
    email: '',
    role: '',
  };

  constructor(public authService: AuthService, 
    private userService: UsersService, 
    private route: Router) { }

  ngOnInit(): void {
    this.formCreate = new FormGroup(
      {
        id: new FormControl ('', [Validators.required]),
        fullName: new FormControl ('', [Validators.required]),
        dni: new FormControl ('', [Validators.required]),
        email: new FormControl ('', [Validators.required, Validators.email]),
        role: new FormControl ('', [Validators.required]),
      }
    )
  }

  saveUser(){
    const user: any = {
      id: "2345678",
      fullName: this.formCreate.value.fullName,
      dni: this.formCreate.value.dni,
      email: this.formCreate.value.email,
      role : this.formCreate.value.role,
    }
    this.userService.saveUser(user).subscribe(response => {console.log(response)});
    
  }
}
