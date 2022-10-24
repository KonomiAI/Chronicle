import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './models/activities/activity.module';
import { FeatureModule } from './models/features/feature.module';
import { StaffModule } from './models/staff/staff.module';
import { RoleModule } from './models/roles/role.module';
import { IPModule } from './models/ip/ip.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './models/products/product.module';
import { FormModule } from './models/forms/form.module';
import { ResponseModule } from './models/responses/response.module';
import { CustomerModule } from './models/customers/customer.module';
import { HealthModule } from './health/health.module';
import { ActivityEntryModule } from './models/activity-entry/activity-entry.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuditModule } from './models/audit/audit.module';

@Module({
  imports: [
    ActivityModule,
    ActivityEntryModule,
    AnalyticsModule,
    AuditModule,
    AuthModule,
    CustomerModule,
    FeatureModule,
    FormModule,
    HealthModule,
    IPModule,
    ProductModule,
    ResponseModule,
    RoleModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
