import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { CourseModel } from 'src/app/shared/modals/grafica/course.model';
import { DataModel } from 'src/app/shared/modals/grafica/data.model';
import { ModuleModel } from 'src/app/shared/modals/grafica/module.model';
import { NotaModel } from 'src/app/shared/modals/grafica/nota.model';
import { SerieModel } from 'src/app/shared/modals/grafica/serie.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GraficaService } from 'src/app/shared/services/grafica/grafica.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {
  studentData:any;
  notas: Array<any> = []
  legendTitle: string="";
  legend: boolean = true;
  notasConvertida: Array<DataModel> = [];
  studentsName: Array<string> = [];
  courses: Array<CourseModel> = []
  coursesName: string[] = [];
  studentScore: any;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Módulos';
  yAxisLabel: string = 'Calificación';
  timeline: boolean = true;
  roundDomains: boolean = true;
  curve: any = shape.curveBumpX;


  constructor(private authService:AuthService,
    private programService:ProgramService,
    private getStudentService: GraficaService) {
    
    }

  ngOnInit(): void { 
    setTimeout(() => {
      this.studentData = this.authService.student;
      console.log(this.studentData)
      console.log(this.studentData.program.id)
      this.actualizarGrafica(this.studentData.program.id, this.studentData.user.fullName)
    }, 2000);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  moduleToserie(module: ModuleModel) {
    const serie: SerieModel = { name:`${module.nameModule} - ${module.nameCourse}` , value: module.score };
    return serie;
  }

  notaToData(nota: NotaModel) {
    const series: Array<SerieModel> = nota.modules.map(module => this.moduleToserie(module));
    const data: DataModel = { name: nota.studentName, series: series };
    return data;
  }
  
  actualizarGrafica(idProgram: string, nameStudent:string) {
    this.getStudentService.getStudentsGrades(idProgram)
      .subscribe((respuesta: any) => {
        this.notas = respuesta;
        this.notas = this.notas.filter(nota => nota.studentName == nameStudent)
        this.notasConvertida = this.notas.map(nota => this.notaToData(nota));
        this.studentsName = this.notasConvertida.map(notaConvertida => notaConvertida.name)
        this.courses = this.notas.map(nota => nota.courses);
        this.coursesName = this.notas[0].courses.map((course: { nameCourse: string; }) => course.nameCourse);
        this.studentScore = this.notas.map(nota => nota.courses.map((course: { score: number; }) => course.score));
      })
  }
  notasMostrar: Array<any> = [];
  bottonActive: Array<boolean> = []
  mostrarEstudiante(student: any, indice: number){
    this.bottonActive[indice]=!this.bottonActive[indice];
    this.notasConvertida = this.notas.map(nota => this.notaToData(nota));
    this.notasConvertida.filter(nota => nota.name)
    if (this.bottonActive[indice] == true) {
      this.notasConvertida = this.notasConvertida.filter(nota => nota.name == this.studentsName[indice])
      this.notasMostrar =this.notasMostrar.concat(this.notasConvertida)
    }else{

      this.notasMostrar =this.notasMostrar.filter(nota => nota.name !== this.studentsName[indice])

    }
  }

}
