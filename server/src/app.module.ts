import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './models/activities/activity.module';
import { FeatureModule } from './models/features/feature.module';

@Module({
  imports: [ActivityModule, FeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
