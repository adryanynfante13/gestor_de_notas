import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseI } from 'src/app/shared/modals/course-i';
import { AuthService } from '../../shared/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { FullProgramI } from 'src/app/shared/modals/fullProgram-i';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  fullProgram!: FullProgramI;
  courses: CourseI[] | undefined
  formCourse: FormGroup = new FormGroup({});

  @Input() item: any;
  constructor(authService: AuthService,
    private programService: ProgramService,  
    private router: Router,
    private route: ActivatedRoute) { }

    id: string | undefined
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProgram(`${id}`);
    this.formCourse = new FormGroup(
      {
        name: new FormControl ('', [Validators.required]),
        average: new FormControl ('', [Validators.required]),

      }
    )
  }

  getProgram(id: string): void {
    this.programService.getProgram(id).subscribe((data) => {
      this.fullProgram = data;
      this.courses = data.program.courses;
    })
    console.log(this.fullProgram)
  }

  saveCourse(){
    const course: CourseI = {
      name: this.formCourse.value.name,
      average: 0,
      modules: [{
        name: "modulo1",
        percentage: 20,
        score: 0
      }]
      }
      this.programService.saveCourse(course, this.fullProgram.program.id as string).subscribe();
      console.log(course);
  }
}
