import { Component, OnInit } from '@angular/core';
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

  user: UserI = {
    id:
      this.authService.userData.uid == undefined
        ? ''
        : this.authService.userData.uid,
    fullName: '',
    dni: '',
    email: '',
    role: ''
  };

  constructor(public authService: AuthService, 
    private userService: UsersService, 
    private route: Router) { }

  ngOnInit(): void {
  }

  saveUser(user: UserI): void {
     this.userService.saveUser(user).subscribe({
      next: (v) => {       
        if (v) {
          console.log(v)
           };
           setTimeout(() => {
           window.location.reload();
         }, 2000);}})
        
  }

}
