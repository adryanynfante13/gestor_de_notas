import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { ProgramI } from 'src/app/shared/modals/program-i';
import { FullProgramI } from '../../shared/modals/fullProgram-i';
import * as uuid from "uuid";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  formProgram: FormGroup = new FormGroup({});

  myId = uuid.v4();

  @Input() item: any;
  constructor(authService: AuthService, 
    private programService: ProgramService,  
    private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {this.formProgram = new FormGroup(
    {
      name: new FormControl ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      duration: new FormControl ('', [Validators.required]),
      startDate: new FormControl ('', [Validators.required]),
      finishDate: new FormControl ('', []),

    }
  )
}

saveFullProgram() {
  const fullProgram: FullProgramI = {
    program: {
      id: this.program().id,
      name: this.program().name,
      description: this.program().description,
      duration: this.program().duration,
      startDate: this.program().startDate,
      finishDate: this.program().finishDate,
      courses: [] 
    },
    students: []
  }
  this.programService.saveProgram(fullProgram).subscribe();
  this.toastr.success('Programa Guardado', 'Exitoso')
  //console.log(fullProgram)
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
program(){
  const program: ProgramI = {
    id: this.myId,
    name: this.formProgram.value.name,
    description: this.formProgram.value.description,
    duration: this.formProgram.value.duration,
    startDate: this.formProgram.value.startDate,
    finishDate: this.date(),
    courses: []
    }
  return program

}

date() {
  let counter: number = 0;
  const date = new Date (this.formProgram.value.startDate);
  const duration = this.formProgram.value.duration;
  while (counter<duration) {
    date.setTime(date.getTime()+24*60*60*1000); // añadimos 1 día
    if (date.getDay() != 6 && date.getDay() != 0)
  counter++;  
  }
  let mounth = date.getMonth()+1;
  let finishMount = '';
    if (mounth<12) 
    finishMount = '' + mounth;
    let finishDate = date.getFullYear() + '-' + finishMount + '-' + date.getDate();
  return finishDate
  }

}
