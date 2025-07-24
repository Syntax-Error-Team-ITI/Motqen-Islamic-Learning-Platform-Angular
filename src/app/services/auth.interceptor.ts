import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    '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';
  if (req.url.includes('/chat')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json',
      },
    });
    return next(authReq);
  }
  return next(req);
};
