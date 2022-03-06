import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './models/activities/activity.module';
import { FeatureModule } from './models/features/feature.module';
import { StaffModule } from './models/staff/staff.module';
import { RoleModule } from './models/roles/role.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './models/products/product.module';

@Module({
  imports: [
    ActivityModule,
    StaffModule,
    FeatureModule,
    RoleModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
