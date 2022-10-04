import { IsDateString, IsIn, IsString, NotContains } from 'class-validator';

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
  @NotContains(' ', {
    message:
      'aggregateCols should not contain space, use only comma to separate the columns',
  })
  public aggregateCols: string;
}
