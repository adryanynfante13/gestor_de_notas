import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseI } from 'src/app/shared/modals/course-i';
import { ModuleI } from 'src/app/shared/modals/module-i';
import { ChangeScoreI } from 'src/app/shared/modals/score-i';
import { StudentI } from 'src/app/shared/modals/student-i';
import { StudentProgramI } from 'src/app/shared/modals/studentProgram-i';
import { UserI } from 'src/app/shared/modals/user-i';
import { ProgramService } from 'src/app/shared/services/program.service';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-assign-score',
  templateUrl: './assign-score.component.html',
  styleUrls: ['./assign-score.component.scss']
})
export class AssignScoreComponent implements OnInit {

  formScore: FormGroup = new FormGroup({});
  programStudent: StudentProgramI | undefined 
  courses: CourseI[] | undefined
  modules: ModuleI[] | undefined
  students: UserI | undefined 
  
  constructor(private route: ActivatedRoute,
    private programService: ProgramService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getStudent(`${id}`);
    this.formScore = new FormGroup(
      {score: new FormControl ('', [Validators.required,  Validators.min(0),  Validators.max(1)])}
    )
  }

  getStudent(id: string): void {
    this.programService.getStudent(id).subscribe((data) => {
      this.programStudent= data;
      this.courses = data.program.courses;
     // console.log(data)
    })
  }

  assignScore(programStudent: StudentProgramI, iCourse: number, iModule: number){
    const changeScore: ChangeScoreI = {
      idProgram: programStudent.program.id, 
      idStudent: programStudent.user.id,
      courseName: programStudent.program.courses[iCourse].name,
      moduleName: programStudent.program.courses[iCourse].modules[iModule].name,
      newScore: this.formScore.value.score
    }
    this.programService.assignScore(changeScore).subscribe()
   // console.log(changeScore)
  }
}

