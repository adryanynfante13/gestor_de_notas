import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { ProgramI } from 'src/app/shared/modals/program-i';
import { FullProgramI } from '../../shared/modals/fullProgram-i';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  formProgram: FormGroup = new FormGroup({});

  @Input() item: any;
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

saveFullProgram() {
  const fullProgram: FullProgramI = {
    id: this.item.id,
    program: {
      name: this.program().name,
      description: this.program().description,
      duration: this.program().duration,
      startDate: this.program().startDate,
      finishDate: this.program().finishDate,
      courses: [null]
    },
    students: []
  }
  this.programService.saveProgram(fullProgram).subscribe();
}
program(){
  const program: ProgramI = {
    name: this.formProgram.value.name,
    description: this.formProgram.value.description,
    duration: this.formProgram.value.duration,
    startDate: this.formProgram.value.startDate,
    finishDate: this.date(),
    courses: [null]
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
    if (mounth<10) 
    finishMount = '0' + mounth;
    let finishDate = date.getFullYear() + '-' + finishMount + '-' + date.getDate();
  return finishDate
  }

}
