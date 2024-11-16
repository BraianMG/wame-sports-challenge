import { IsEnum, IsOptional, Max, Min } from 'class-validator';
import { ISearch } from './search.interface';
import { Type } from 'class-transformer';
import { OrderDirection } from './enums';

export class SearchDto implements ISearch {
  /**
   * Pagination limit
   */
  @IsOptional()
  @Min(0)
  @Max(250)
  @Type(() => Number)
  take = 10;

  /**
   * Pagination offset
   */
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  skip = 0;

  /**
   * Filter
   */
  @IsOptional()
  quickFilter?: string = '';

  /**
   * OrderBy
   */
  @IsOptional()
  orderBy?: string = '';

  /**
   * OrderType
   */
  @IsEnum(OrderDirection)
  @IsOptional()
  orderDirection?: OrderDirection;

  /**
   * Where
   */
  @IsOptional()
  where?: object;
}
