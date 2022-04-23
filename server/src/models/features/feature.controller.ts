import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Feature as FeatureModel } from '@prisma/client';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';

import { FeatureService } from './feature.service';

@Controller('features')
@UseInterceptors(TransformInterceptor)
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Auth(Actions.WRITE, [Features.Security])
  @Get()
  async getFeatures(): Promise<FeatureModel[]> {
    return this.featureService.features({});
  }
}
