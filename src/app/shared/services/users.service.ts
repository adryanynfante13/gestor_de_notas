import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{UserI} from '../modals/user-i';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  push(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {

  }
  saveUser(user: UserI): Observable<any> {
    let direction = this.url + 'user';
    return this.http.post(direction, user, { responseType: 'text'});
  }

  getUsersAll():Observable<UserI[]>{
    let direction = this.url + 'user';
    return this.http.get<UserI[]>(direction);
  }

  getStudent(id : string):Observable<UserI>{
    let direction = this.url + 'user/' + id;
    return this.http.get<UserI>(direction);
  }

}
