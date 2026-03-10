import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {API_URL} from './constants';
import {inject} from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const url = inject(API_URL);
  if (req.url.includes(url)) {
    req = req.clone({withCredentials: true});
  }
  return next(req);
};
