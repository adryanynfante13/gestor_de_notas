import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramI } from '../modals/program-i';
import { CourseI } from '../modals/course-i';
import { ModuleI } from '../modals/module-i';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  push(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  saveProgram(program: ProgramI): Observable<any> {
    let direction = this.url + 'program';
    return this.http.post(direction, program, { responseType: 'text'});
    
  }

  saveCourse(course: CourseI): Observable<any> {
    let direction = this.url + 'course';
    return this.http.post(direction, course, { responseType: 'text'});
  }
  saveModules(module: ModuleI): Observable<any> {
    let direction = this.url + 'module';
    return this.http.post(direction, module, { responseType: 'text'});
  }

  getProgramsAll():Observable<ProgramI[]>{
    let direction = this.url + 'program';
    return this.http.get<ProgramI[]>(direction);
  }
  getProgram(id : string):Observable<ProgramI[]>{
    let direction = this.url + 'program/' + id;
    return this.http.get<ProgramI[]>(direction);
  }


}
