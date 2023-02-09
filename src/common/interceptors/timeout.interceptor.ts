import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { catchError, Observable, throwError, timeout, TimeoutError } from "rxjs";



@Injectable()
export class TimeoutInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
        return next.handle().pipe(
            timeout(5000),
            catchError(e => {
                if(e instanceof TimeoutError){
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => e);
            })
        )
    }
}