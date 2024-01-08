// // student.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// interface StudentData {
//   image: File;
//   fname: string;
//   // ... other properties ...
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class StudentService {
//   private apiUrl = 'http://localhost:3000/api/students';

//   constructor(private http: HttpClient) {}

//   submitStudentForm(formData: StudentData): Observable<any> {
//     const url = `${this.apiUrl}/add`;
//     const formDataObj = new FormData();
//     formDataObj.append('image', formData.image);
//     formDataObj.append('fname', formData.fname);
//     // ... append other properties ...

//     return this.http.post(url, formDataObj)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   private handleError(error: HttpErrorResponse) {
//     if (error.error instanceof ErrorEvent) {
//       console.error('An error occurred:', error.error.message);
//     } else {
//       console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
//     }
//     return throwError('Something bad happened; please try again later.');
//   }
// }

// notification.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showSubscriptionEndNotification(expirationDate: Date): void {
    setTimeout(() => {
      alert('Your subscription has ended. Please renew your plan.');
    }, expirationDate.getTime() - Date.now());
  }
}

