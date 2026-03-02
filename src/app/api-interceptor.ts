import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (req.url.includes('localhost:3000')) {
    req = req.clone({withCredentials: true});
  }
  return next(req);
};
