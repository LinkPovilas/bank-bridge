import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class BankIdValidationPipe implements PipeTransform {
  transform(value: string) {
    // Examples: SEB_SE and SEB_SE_TEST
    const bankIdRegex = /^[a-zA-Z]+_[a-zA-Z]{2}(?:_[a-zA-Z]{4})?$/;
    if (!bankIdRegex.test(value)) {
      throw new BadRequestException(`Invalid bankId format: ${value}`);
    }
    return value;
  }
}
