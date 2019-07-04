import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  requestTimeOut = 10 * 60 * 1000 // 10 minutes

  constructor(
    private http: HttpClient
  ) {
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(API_URL + url)
      .pipe(
        timeout(this.requestTimeOut)
      );
  }

  post(url: string, data: any) {
    return this.http.post<any>(API_URL + url, data, this.httpOptions)
      .pipe(
        timeout(this.requestTimeOut)
      );
  }

  put(url: string, data: any) {
    return this.http.put<any>(API_URL + url, data, this.httpOptions)
      .pipe(
        timeout(this.requestTimeOut)
      );
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(API_URL + url)
      .pipe(
        timeout(this.requestTimeOut)
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        return error;
    };
  }

}
