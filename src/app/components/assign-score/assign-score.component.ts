import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentI } from 'src/app/shared/modals/student-i';
import { ProgramService } from 'src/app/shared/services/program.service';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-assign-score',
  templateUrl: './assign-score.component.html',
  styleUrls: ['./assign-score.component.scss']
})
export class AssignScoreComponent implements OnInit {

  programStudents: StudentI[] | undefined 
  
  constructor(private route: ActivatedRoute,
    private programService: ProgramService) { }

  ngOnInit(): void {
    
  }
  getStudent(id: string): void {
    this.programService.getStudent(id).subscribe((data) => {
      //this.programStudents= data;
      
    })
  }


}

