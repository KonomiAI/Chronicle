import { IsDateString, IsIn, IsString } from 'class-validator';

export class GetAnalyticsReportDto {
  @IsDateString({
    strict: true,
  })
  public start: string;

  @IsDateString({
    strict: true,
  })
  public end: string;

  @IsIn(['activity', 'customer', 'product', 'staff'])
  public source: string;

  @IsString()
  public aggregateCols: string;
}
