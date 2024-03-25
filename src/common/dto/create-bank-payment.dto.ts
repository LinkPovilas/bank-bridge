import {
  IsISO4217CurrencyCode,
  IsIBAN,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { BankPayment } from '../interfaces/bank-payment.interface';
import { Type } from 'class-transformer';

export class CreateBankPaymentDto implements BankPayment {
  @IsString()
  @IsNotEmpty()
  @MaxLength(70)
  creditorName: string;

  @IsIBAN()
  creditorIban: string;

  @IsIBAN()
  debtorIban: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  amount: string;

  @IsISO4217CurrencyCode()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  remittanceInformationUnstructured: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(35)
  endToEndId: string;
}
