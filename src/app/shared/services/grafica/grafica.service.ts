import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraficaService {

  _url="https://notes-gestor-sofka.herokuapp.com/studentGrades"

  constructor(private http:HttpClient) { }

  getStudentsGrades(idProgram:string){

    let header =new HttpHeaders;
    header.set('Type-Content','aplication/json')
    return this.http.get(`${this._url}/${idProgram}`, {headers:header});
  }

  getStudentGrades(idProgram:string, idStudent:string){
    let header =new HttpHeaders;
    header.set('Type-Content','aplication/json')
    return this.http.get(`${this._url}/${idProgram}/${idStudent}`, {headers:header});
  }

}
