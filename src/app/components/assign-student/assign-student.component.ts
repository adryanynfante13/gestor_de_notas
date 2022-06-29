import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { UserI } from 'src/app/shared/modals/user-i'
import { ModalSwitchService } from 'src/app/shared/services/modal-switch.service'
import { UsersService } from 'src/app/shared/services/users.service'

@Component({
  selector: 'app-assign-student',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.scss'],
})
export class AssignStudentComponent implements OnInit {
  assignStudentForm: FormGroup = new FormGroup({})
  student: UserI | undefined
  users: UserI[] | undefined


  constructor(private modalService: ModalSwitchService,  
    private router: Router, 
    private studentService: UsersService,
    private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.assignStudentForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
    })
    this.getStudentsAll();
    this.studentService.getStudentsAll().subscribe((data) => {this.users = data})
 
  }

  getStudentsAll(): void {(this.getStudentsAll)};

  getStudent(id: string): void {
    this.studentService.getStudent(id).subscribe((data) => {
    this.student = data;
    })
    console.log(this.student)
  }


}
