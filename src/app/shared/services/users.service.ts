import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{UserI} from './user-i';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  push(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private url: string = '';

  constructor(private http: HttpClient) { 

  }
  saveUser(user: UserI): Observable<any> {
    let direction = this.url + 'user/';
    return this.http.post<any>(direction, user);
  }
}
