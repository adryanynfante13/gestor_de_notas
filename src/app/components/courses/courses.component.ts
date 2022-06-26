import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseI } from 'src/app/shared/modals/course-i';
import { AuthService } from '../../shared/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  formCourse: FormGroup = new FormGroup({});

  constructor(authService: AuthService,
    private programService: ProgramService,  
    private route: Router) { }

  ngOnInit(): void {
    this.formCourse = new FormGroup(
      {
        name: new FormControl ('', [Validators.required]),
        description: new FormControl ('', [Validators.required]),

      }
    )
  }
  saveCourse(){
    const course: CourseI = {
      name: this.formCourse.value.name,
      description: this.formCourse.value.description,
      }
      this.programService.saveCourse(course).subscribe();
      console.log(course);
  }
}
