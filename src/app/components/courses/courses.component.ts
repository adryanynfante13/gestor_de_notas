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
        average: new FormControl ('', [Validators.required]),
        modules : new FormControl ([], [Validators.required])

      }
    )
    this.modulesForm = new FormGroup(
      {
        name: new FormControl ('', [Validators.required]),
        percentage: new FormControl ('', [Validators.min(0), Validators.required]),
        score : new FormControl ('', [Validators.min(0),  Validators.required])

      }
    )
    this.crearFormularioModules();
    this.addModules();

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
  
  crearFormularioModules() {
    this.modulesForm = this.fb.group({
      modules:this.fb.array([])
    });
  }
 

  addModules() {
    const modules = this.fb.group({
      name: new FormControl(''),
      percentage: new FormControl(''),
      score: new FormControl('')
    });
    console.log("acá modulos");
    this.modules.push(modules);
  }

  deleteModule(indice: number) {
    this.modules.removeAt(indice);
  }

}
