import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly code: string;
}
