import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseModel } from 'src/app/shared/modals/grafica/course.model';
import { DataModel } from 'src/app/shared/modals/grafica/data.model';
import { ModuleModel } from 'src/app/shared/modals/grafica/module.model';
import { NotaModel } from 'src/app/shared/modals/grafica/nota.model';
import { SerieModel } from 'src/app/shared/modals/grafica/serie.model';
import { GraficaService } from 'src/app/shared/services/grafica/grafica.service';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-grafica-detalle',
  templateUrl: './grafica-detalle.component.html',
  styleUrls: ['./grafica-detalle.component.scss']
})
export class GraficaDetalleComponent implements OnInit {
  notasConvertida: Array<DataModel> = [];
  notasMostrar: Array<any> = [];
  studentsName: Array<string> = []
  coursesName: string[] = []
  view: number[] = [1500, 800];
  notas: Array<any> = []
  courses: Array<CourseModel> = []
  studentScore: any
  coursesValues: Array<Array<any>> = []
  //options
  legend: boolean = true;
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
  idprogram: string = "ciclo-col-c2";
  legendTitle: string="";
  bottonActive: Array<boolean> = []

  constructor(private getStudentService: GraficaService) {
    this.actualizarGrafica(this.idprogram);
  }

  ngOnInit(): void { }

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

  actualizarGrafica(idProgram: string) {
    this.getStudentService.getStudentsGrades(idProgram)
      .subscribe((respuesta: any) => {
        this.notas = respuesta;
        this.notasConvertida = this.notas.map(nota => this.notaToData(nota));
        this.studentsName = this.notasConvertida.map(notaConvertida => notaConvertida.name)
        this.courses = this.notas.map(nota => nota.courses);
        this.coursesName = this.notas[0].courses.map((course: { nameCourse: string; }) => course.nameCourse);
        this.studentScore = this.notas.map(nota => nota.courses.map((course: { score: number; }) => course.score));
      })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource(this.notas);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEstudiante(student: any, indice: number){
    this.bottonActive[indice]=!this.bottonActive[indice];
    this.notasConvertida = this.notas.map(nota => this.notaToData(nota));
    if (this.bottonActive[indice] == true) {
      this.notasConvertida = this.notasConvertida.filter(nota => nota.name == this.studentsName[indice])
      this.notasMostrar =this.notasMostrar.concat(this.notasConvertida)
    }else{

      this.notasMostrar =this.notasMostrar.filter(nota => nota.name !== this.studentsName[indice])

    }
  }

}
