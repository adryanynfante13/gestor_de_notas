import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseI } from 'src/app/shared/modals/course-i';
import { AuthService } from '../../shared/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { FullProgramI } from 'src/app/shared/modals/fullProgram-i';
import { ModuleI } from 'src/app/shared/modals/module-i';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  fullProgram!: FullProgramI;
  courses: CourseI[] | undefined
  moduleList: ModuleI[] = []; 
  formCourse: FormGroup = new FormGroup({});
  modulesForm: FormGroup = new FormGroup({});

  
  get modules(): FormArray {
    return this.modulesForm.get('modules') as FormArray;
  }

  @Input() item: any;
  constructor(authService: AuthService,
    private programService: ProgramService,  
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }
    

    id: string | undefined
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProgram(`${id}`);
    this.formCourse = new FormGroup(
      {
        name: new FormControl ('', [Validators.required]),
        average: new FormControl ('', []),
        nameModule: new FormControl ('', []),
        percentage: new FormControl (0, [Validators.min(1)]),
        score : new FormControl (0, [Validators.min(0)])
      }
    )
    this.crearFormularioModules();
  }

  getProgram(id: string): void {
    this.programService.getProgram(id).subscribe((data) => {
      this.fullProgram = data;
      this.courses = data.program.courses;
    })
  }

  saveModule(){
    const module: ModuleI = {
      name: this.formCourse.value.nameModule,
      percentage: this.formCourse.value.percentage,
      score: 0
    }
    this.moduleList.push(module);
    return module
  }

  saveCourse(){
    const course: CourseI = {
      name: this.formCourse.value.name,
      average: 0,
      modules: this.moduleList
      }
      this.programService.saveCourse(course, this.fullProgram.program.id as string).subscribe();
      /*setTimeout(() => {
        window.location.reload();
      }, 2000);*/
  }


  
  crearFormularioModules() {
    this.modulesForm = this.fb.group({
      modules:this.fb.array([])
    });
  }

  deleteModule(i: number) {
    this.moduleList.splice(i, 1);
  }



}

