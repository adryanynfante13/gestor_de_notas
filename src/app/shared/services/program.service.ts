import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramI } from '../modals/program-i';
import { CourseI } from '../modals/course-i';
import { ModuleI } from '../modals/module-i';
import { FullProgramI } from '../modals/fullProgram-i';
import { UserI } from '../modals/user-i';
import { StudentI } from '../modals/student-i';
import { StudentProgramI } from '../modals/studentProgram-i';
import { ChangeScoreI } from '../modals/score-i';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  push(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  saveProgram(fullProgram: FullProgramI): Observable<any> {
    let direction = this.url + 'program';
    return this.http.post<any>(direction, fullProgram.program, {
      responseType: 'text' as 'json',
    });
  }

  saveCourse(course: CourseI, id: string): Observable<any> {
    let direction = this.url + 'course/' + id;
    return this.http.put(direction, course, { responseType: 'text'});
  }

  addStudent(student: StudentI, id: string): Observable<any> {
    let direction = this.url + 'program/' + id;
    return this.http.put(direction, student, { responseType: 'text'});
  }

  getStudentsAll():Observable<StudentI[]>{
    let direction = this.url + 'students';
    return this.http.get<StudentI[]>(direction);
  }

  

  getStudent(id : string):Observable<StudentProgramI>{
    let direction = this.url + 'students/' + id;
    return this.http.get<StudentProgramI>(direction);
  }

  getUserRole(id : string):Observable<UserI>{
    let direction = this.url + 'user/' + id;
    return this.http.get<UserI>(direction);
  }

  saveModules(module: ModuleI): Observable<any> {
    let direction = this.url + 'module';
    return this.http.post(direction, module, { responseType: 'text'});
  }

  getProgramsAll():Observable<FullProgramI[]>{
    let direction = this.url + 'program';
    return this.http.get<FullProgramI[]>(direction);
  }
  getProgram(id : string):Observable<FullProgramI>{
    let direction = this.url + 'program/' + id;
    return this.http.get<FullProgramI>(direction);
  }

  assignScore(score: ChangeScoreI): Observable<any> {
    let direction = this.url + 'changescore';
    return this.http.put(direction, score, { responseType: 'text'});
  }

}
