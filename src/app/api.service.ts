import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:9090'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/questions/all");
  }
  getCountMatches(result : any){
    return this.http.post<any>(this.apiUrl+"/questions/countMatches",result);
  }
}
