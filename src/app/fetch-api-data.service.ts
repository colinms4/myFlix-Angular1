import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // api url
  apiUrl = 'https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/';

  constructor(private http: HttpClient) {
  }

  private getToken(): string {
    return localStorage.getItem("token") || "";
  }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(this.apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(Username: string, Password: string): Observable<any> {
    const userDetails = { Username, Password }
    return this.http.post(`${this.apiUrl}/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http.get(this.apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getMovieByTitle(Title: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/movies/${Title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getDirector(name: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/movies/directors/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getGenre(name: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/movies/genre/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getUser(Username: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/users/${Username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public userFavoriteMovie(Username: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/users/${Username}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public addMovieToFavorites(Username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http.put(`${this.apiUrl}/users/${Username}/movies/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public editUser(userDetails: any): Observable<any> {
    const token = this.getToken();
    return this.http.put(`${this.apiUrl}/users/${userDetails.id}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteUser(Username: string): Observable<any> {
    const token = this.getToken();
    return this.http.delete(`${this.apiUrl}/users/${Username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public removeFavoriteMovie(Username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    return this.http.delete(`${this.apiUrl}/users/${Username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(response: any): any {
    return response || {};
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
