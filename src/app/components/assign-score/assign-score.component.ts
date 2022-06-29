import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseI } from 'src/app/shared/modals/course-i';
import { StudentI } from 'src/app/shared/modals/student-i';
import { UserI } from 'src/app/shared/modals/user-i';
import { ProgramService } from 'src/app/shared/services/program.service';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-assign-score',
  templateUrl: './assign-score.component.html',
  styleUrls: ['./assign-score.component.scss']
})
export class AssignScoreComponent implements OnInit {

  programStudent: StudentI | undefined 
  courses: CourseI[] | undefined
  students: UserI | undefined 
  
  constructor(private route: ActivatedRoute,
    private programService: ProgramService) { }

  ngOnInit(): void {
    
  }

  getStudent(id: string): void {
    this.programService.getStudent(id).subscribe((data) => {
      this.programStudent= data;    
      console.log(data)
    })
  }


}

