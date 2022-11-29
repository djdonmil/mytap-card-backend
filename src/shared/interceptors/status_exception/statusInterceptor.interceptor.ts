import { ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { StatusException } from "./status.exception";

@Injectable()
export class StatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        throw new StatusException(data, HttpStatus.OK);
      }),
    );
  }
}