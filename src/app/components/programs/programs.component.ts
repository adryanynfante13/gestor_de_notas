import { Component, OnInit } from '@angular/core';
import { ProgramI } from 'src/app/shared/modals/program-i';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programs: ProgramI[] | undefined;

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getProgramsAll();
   this.programService.getProgramsAll().subscribe((data) => {this.programs = data});
  }

  getProgramsAll(): void {(this.getProgramsAll)};

}
