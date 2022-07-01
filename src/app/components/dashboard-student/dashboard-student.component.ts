import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { DataModel } from 'src/app/shared/modals/grafica/data.model';
import { ModuleModel } from 'src/app/shared/modals/grafica/module.model';
import { NotaModel } from 'src/app/shared/modals/grafica/nota.model';
import { SerieModel } from 'src/app/shared/modals/grafica/serie.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GraficaService } from 'src/app/shared/services/grafica/grafica.service';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {
  studentData:any;

  constructor(private authService:AuthService,
    private programService:ProgramService) { }

  ngOnInit(): void { 
    setTimeout(() => {
      this.studentData = this.authService.student;
      console.log(this.studentData.id)
    }, 2000);
  }


}
