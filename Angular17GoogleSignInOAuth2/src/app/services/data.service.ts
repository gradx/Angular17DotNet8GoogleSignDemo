import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7109';

  readonly headers = new HttpHeaders().append(
    'Content-Type',
    'application/json'
  );

  readonly headers2 = new HttpHeaders().append(
    'Content-Type',
    'text/plain'
  );

  constructor(private http: HttpClient) { }

  // Method to retrieve data using GET request


  getMessage(): Observable<string> {


    
    return this.http.get(`${this.apiUrl}/security/getMessage`, {  responseType: 'text' });
    // return this.http.get<any>(`${this.apiUrl}/security/getMessage`).pipe(
    //   catchError(error => {
    //     console.error('Error fetching JSON data:', error);
    //     return throwError(()=> new Error('Something went wrong; please try again later.'));
    //   })
    // );
  }
  

  validateToken(data: any) {
    return this.http.post(this.apiUrl + '/security/createToken', JSON.stringify(data), {
      headers: this.headers
    });
  }
}
