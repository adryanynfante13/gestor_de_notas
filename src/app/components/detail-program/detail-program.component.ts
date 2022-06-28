import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProgramI } from 'src/app/shared/modals/program-i'
import { ProgramService } from 'src/app/shared/services/program.service'
import { FullProgramI } from '../../shared/modals/fullProgram-i';
import { CourseI } from '../../shared/modals/course-i';



@Component({
  selector: 'app-detail-program',
  templateUrl: './detail-program.component.html',
  styleUrls: ['./detail-program.component.scss'],
})
export class DetailProgramComponent implements OnInit {
  fullProgram: FullProgramI | undefined
  courses: CourseI[] | undefined
 


  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute,
  ) {}

  id: string | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProgram(`${id}`);

  }


  getProgram(id: string): void {
    this.programService.getProgram(id).subscribe((data) => {
      this.fullProgram = data;
      this.courses = data.program.courses;
    })
  }


}
