import { Controller, Get } from '@nestjs/common';
import { Feature as FeatureModel } from '@prisma/client';

import { FeatureService } from './feature.service';

@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get()
  async getFeatures(): Promise<FeatureModel[]> {
    return this.featureService.features({});
  }
}
