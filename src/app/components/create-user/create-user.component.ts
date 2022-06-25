import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
  
})
export class CreateUserComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }


}
