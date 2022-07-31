// import { Injectable , Injector } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HTTP_INTERCEPTORS
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './servicios/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private injector: Injector) {}
//   intercept(req, next) {
//     let authService = this.injector.get(AuthService)
//     console.log(authService.getToken())
//     let tokenizeReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${authService.getToken()}`
//       }
//     })
//     return next.handle(tokenizeReq)
//   }
 
// }


