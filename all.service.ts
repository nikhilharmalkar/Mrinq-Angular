import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


const PostUpdHttpHeader = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AllService {

  private AllNames = 'http://localhost:3000/allnames';
  private UpdateNames = 'http://localhost:3000/allnames';
  private Add = 'http://localhost:3000/allnames';
  private type = 'http://localhost:3000/type';
  private deleteUser = 'http://localhost:3000/allnames';

  constructor(private http: HttpClient) { }

  // show all names added
  public getAll(): Observable<any[]> {
    return this.http.get<any>(this.AllNames);
  }

  // get all type
  public getType(): Observable<any[]> {
    return this.http.get<any>(this.type);
  }

   // Add name
   public addName(add: any): Observable<any[]> {
    console.log('service hit: add name');
    return this.http.post<any>(this.Add, add, PostUpdHttpHeader);
  }

   // Update Name Detail
   public updateName(update: any): Observable<any[]> {
    console.log('service hit: update name');
    return this.http.put<any>(this.UpdateNames, update, PostUpdHttpHeader);
  }

   delete (deleteUser) {
    console.log('delete success ');
    return this.http.request('DELETE', this.deleteUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }) , body: deleteUser});
  }

}
