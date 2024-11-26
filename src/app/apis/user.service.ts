import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BaseUrl = 'https://ca0b716114369df02bc2.free.beeceptor.com/';
  jsonUrl = '../../assets/country.json';

  constructor(
     private http : HttpClient
  ){}
  get_student(){
   return this.http.get(this.BaseUrl + 'api/users/')
  }
  add_student(body:any){
    return this.http.post(this.BaseUrl + 'api/users',body)
   }
   update_student(id: number, body: any) {
    return this.http.put(`${this.BaseUrl}api/users/${id}`, body);
  }
  delete_student(id: number) {
    return this.http.delete(`${this.BaseUrl}api/users/${id}`);
  }
  get_country(){
    return this.http.get(this.jsonUrl)
   }
}
