import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HeaderName } from '../../enums/header-name.enum';
import { isIP } from 'class-validator';

// TODO: revisit
@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const headers = req.headers;

    for (const headerName in headers) {
      switch (headerName) {
        case HeaderName.BANK_ACCESS_TOKEN:
          if (!headers[headerName]) {
            throw new BadRequestException('invalid bank access token');
          }
          break;
        case HeaderName.END_USER_IP_ADDRESS:
          if (!isIP(headers[headerName])) {
            throw new BadRequestException('invalid IP address');
          }
          break;
        default:
          continue;
      }
    }

    next();
  }
}
