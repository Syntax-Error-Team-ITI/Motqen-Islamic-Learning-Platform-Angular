import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    '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';
  if (req.url.includes('/chat')) {
    const authReq = req.clone({
      setHeaders: {
      
       'Content-Type': 'application/json',
      },
    });
    return next(authReq);
  }
  return next(req);
};
