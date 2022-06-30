import { Component, OnInit} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FullProgramI } from 'src/app/shared/modals/fullProgram-i'
import { StudentI } from 'src/app/shared/modals/student-i';
import { UserI } from 'src/app/shared/modals/user-i'
import { UsersService } from 'src/app/shared/services/users.service'
import { ProgramService } from '../../shared/services/program.service';



@Component({
  selector: 'app-assign-student',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.scss'],
})
export class AssignStudentComponent implements OnInit {

  assignStudentForm: FormGroup = new FormGroup({})
  fullProgram!: FullProgramI;
  students: UserI[] | undefined 
  student!: UserI
  users: UserI[] | undefined


  constructor(   
    private studentService: UsersService,
    private route: ActivatedRoute,
    private programService: ProgramService,
    private toastr: ToastrService ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProgram(`${id}`);
    this.getUsersAll();
    this.studentService.getUsersAll().subscribe((data) => {this.students = data})
    this.assignStudentForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
    })

  }



  getProgram(id: string): void {
    this.programService.getProgram(id).subscribe((data) => {
      this.fullProgram = data;
    })
  }

  getUsersAll(): void {(this.getUsersAll)};

  getStudent(id: string): void {
    this.studentService.getStudent(id).subscribe((data) => {3
    this.student = data;
    });
  }

  addStudent(student: UserI) {
    const assingStudent: StudentI = {
      user: {
        id: student.id,
        fullName: student.fullName,
        dni: student.dni,
        email: student.email,
        role: student.role
      },
      average: 0
    }
    this.programService.addStudent(assingStudent, this.fullProgram.program.id as string).subscribe()
    this.toastr.success('Estudiante asignado', 'Exitoso')
    //console.log(assingStudent)
  }


}
