import { ResponseStatus } from '@/types/movie';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalErrorService } from '../services/global-error/global-error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  globalErrorService = inject(GlobalErrorService);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.ok && event.body.Response === ResponseStatus.False) {
            this.globalErrorService.setError(event.body.Error);
            console.error(event);
          }
        }

        return event;
      })
    );
  }
}
