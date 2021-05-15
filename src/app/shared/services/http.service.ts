import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseApiUrl: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.baseApiUrl = environment.baseApiUrl;
  }

  private getToken(): string {
    const userData = JSON.parse(localStorage.getItem('authData'));
    let token = null;
    if (userData != null && userData.token !== undefined && userData.token != null) {
      token = userData.token;
    }
    return token;
  }

  // Uses http.get() to load data from a single API endpoint
  get(url, queryParams?, responseType?): Observable<any> {
    const queryParameters = queryParams ? queryParams : {};
    const responseTypes = responseType ? responseType : null;

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: queryParameters,
      responseType: responseTypes
    };

    const token = this.getToken();

    if (token != null) {
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-auth-token': token }),
        params: queryParameters,
        responseType: responseTypes
      };
    }
    return this.http.get(this.baseApiUrl + url, httpOptions).pipe(
      map(res => {
        const statusKey = 'status';
        const messageKey = 'message';
        if (res[statusKey] === 'error') {
          this.snackBar.open(res[messageKey], 'close', {
            duration: 15000
          });
        }
        return res;
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  post(url, data): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const token = this.getToken();
    if (token != null) {
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-auth-token': token })
      };
    }
    const body = JSON.stringify(data);
    return this.http
      .post(this.baseApiUrl + url, body, httpOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  upload(url, data): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ Accept: 'application/json' })
    };
    const token = this.getToken();
    if (token != null) {
      httpOptions = {
        headers: new HttpHeaders({ Accept: 'application/json', 'x-auth-token': token })
      };
    }
    return this.http
      .post(this.baseApiUrl + url, data, httpOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  put(url, data, queryParams?): Observable<any> {
    const queryParameters = queryParams ? queryParams : {};
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: queryParameters
    };
    const token = this.getToken();
    if (token != null) {
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-auth-token': token }),
        params: queryParameters
      };
    }
    const body = JSON.stringify(data);
    return this.http
      .put(this.baseApiUrl + url, body, httpOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  delete(url, queryParams?): Observable<any> {
    const queryParameters = queryParams ? queryParams : {};
    const token = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-auth-token': token }),
      params: queryParameters
    };
    return this.http
      .delete(this.baseApiUrl + url, httpOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }
  // tslint:disable-next-line:typedef
  private errorHandler(response: any) {
    console.log('errorHandler Response', response);
    // console.dir(response)
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('kc-requester');
      this.router.navigate(['auth/login']);
      this.snackBar.open('May be session is ended! please login again', 'close', {
        duration: 10000
      });
    }
    const error = response.error;
    let key = 'error';
    let message = response?.message;
    if (typeof error === 'object') {
      const keys = Object.keys(error);
      key = keys[0];
      message = error?.message;
    }
    if (typeof error === 'string') {
      message = error;
    }
    if (response.status === 0) {
      message = 'Connection is not stable';
    }
    this.snackBar.open(message, 'close', {
      duration: 10000
    });
    return throwError({ messages: message }, error);
  }
}
