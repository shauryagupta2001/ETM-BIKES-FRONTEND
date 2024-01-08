// // subscription.service.ts
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class SubscriptionService {
//   // Simulated data from the backend
//   getSubscriptionStatus(): Observable<any> {
//     const subscriptionData = {
//       status: 'active',
//       expirationDate: new Date('2023-12-31'),
//     };
//     return of(subscriptionData);
//   }
// }
// subscription.service.ts
// import { Injectable } from '@angular/core';
// import { Observable, of, timer } from 'rxjs';
// import { map, take } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class SubscriptionService {
//   // Simulated data from the backend
//   getSubscriptionStatus(): Observable<any> {
//     const expirationDate = new Date();
//     expirationDate.setSeconds(expirationDate.getSeconds() + 15); // Set expiration to 15 seconds from now

//     const subscriptionData = {
//       status: 'active',
//       expirationDate: expirationDate,
//     };

//     return of(subscriptionData);
//   }

//   simulateSubscriptionEndNotification(): Observable<void> {
//     return timer(0, 1000).pipe(
//       take(15), // Simulate 15 seconds countdown
//       map(() => {})
//     );
//   }
// }

// subscription.service.ts
// import { Injectable } from '@angular/core';
// import { Observable, of, timer } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class SubscriptionService {
//   // Simulated data for subscription status
//   private subscriptionData = {
//     expirationDate: new Date('2023-12-29T19:00:00'),
//   };

//   constructor() {}

//   getSubscriptionStatus(): Observable<any> {
//     return of(this.subscriptionData);
//   }

//   simulateSubscriptionEndNotification(): Observable<any> {
//     // Simulate subscription end notification every 15 seconds
//     return timer(0, 15000);
//   }
// }

