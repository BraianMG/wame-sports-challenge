import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMatchDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  homeTeam: string;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  awayTeam: string;

  @IsDateString()
  @IsNotEmpty()
  dateTime: Date;
}
