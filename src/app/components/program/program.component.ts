import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { ProgramI } from 'src/app/shared/modals/program-i';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  formProgram: FormGroup = new FormGroup({});

  constructor(authService: AuthService, 
    private programService: ProgramService,  
    private route: Router) { }

  ngOnInit(): void {this.formProgram = new FormGroup(
    {
      name: new FormControl ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      duration: new FormControl ('', [Validators.required]),
      startDate: new FormControl ('', [Validators.required]),
      finishDate: new FormControl ('', [Validators.required]),

    }
  )
}
saveProgram(){
  const program: ProgramI = {
    id: '',
    name: this.formProgram.value.name,
    description: this.formProgram.value.description,
    duration: this.formProgram.value.duration,
    startDate: this.formProgram.value.startDate,
    finishDate: this.formProgram.value.finishDate,
    }
   
    console.log(program);
}


}
