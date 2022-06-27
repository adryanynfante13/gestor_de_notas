import { Component, OnInit } from '@angular/core';
import { ProgramI } from 'src/app/shared/modals/program-i';
import { ProgramService } from 'src/app/shared/services/program.service';
import { FullProgramI } from '../../shared/modals/fullProgram-i';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programs: ProgramI[] | undefined;
  fullPrograms: FullProgramI[] | undefined;

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getProgramsAll();
    this.programService.getProgramsAll().subscribe((data) => {this.fullPrograms = data});
  }

  getProgramsAll(): void {(this.getProgramsAll)};

}
