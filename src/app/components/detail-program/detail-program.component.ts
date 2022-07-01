import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProgramI } from 'src/app/shared/modals/program-i'
import { ProgramService } from 'src/app/shared/services/program.service'
import { FullProgramI } from '../../shared/modals/fullProgram-i';
import { CourseI } from '../../shared/modals/course-i';
import { UserI } from 'src/app/shared/modals/user-i';
import { UsersService } from '../../shared/services/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentI } from '../../shared/modals/student-i';
import { StudentProgramI } from 'src/app/shared/modals/studentProgram-i';




@Component({
  selector: 'app-detail-program',
  templateUrl: './detail-program.component.html',
  styleUrls: ['./detail-program.component.scss'],
})
export class DetailProgramComponent implements OnInit {
  fullProgram: FullProgramI | undefined
  fullPrograms: StudentProgramI[] | undefined
  courses: CourseI[] | undefined
  students: UserI | undefined 
  programStudents: StudentI[] | undefined 
  programStudent: StudentI | undefined 
  studentsP: StudentProgramI[] | undefined


  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute,
    private studentService: UsersService
  ) {}

  id: string | undefined;
  idStudentCal:string = '';
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProgram(`${id}`);
    this.getStudentsAll();
    this.programService.getStudentsAll().subscribe((data) => {
      this.programStudents = data})
    this.getStudent(this.idStudentCal);
  }


  getStudentsAll(): void {(this.getStudentsAll)};

  getProgram(id: string): void {
    this.programService.getProgram(id).subscribe((data) => {
      this.fullProgram = data;
      this.courses = data.program.courses;
      this.studentsP = data.students;
      console.log(this.students)
    })
  }

  
  getStudent(id: string): void {
    this.programService.getStudent(id).subscribe((data) => {
      this.programStudent= data;    
      console.log(data)
    })
  }


}
