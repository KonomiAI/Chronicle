import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './models/activities/activity.module';
import { StaffModule } from './models/staff/staff.module';

@Module({
  imports: [ActivityModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
