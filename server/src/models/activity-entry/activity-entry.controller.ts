import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ActivityEntryService } from './activity-entry.service';

const DEFAULT_ENTRY_SELECT = {
  id: true,
  customer: true,
  activity: true,
  products: true,
  createdAt: true,
  updatedAt: true,
};

@Controller('activity-entry')
@UseInterceptors(TransformInterceptor)
export class ActivityEntryController {
  constructor(private service: ActivityEntryService) {}
  @Get()
  getActivityEntries() {
    return this.service.getActivityEntries({
      select: DEFAULT_ENTRY_SELECT,
    });
  }

  @Get(':id')
  getActivityEntryById(@Param('id') id: string) {
    return this.service.getActivityEntryById(id, DEFAULT_ENTRY_SELECT);
  }
}
