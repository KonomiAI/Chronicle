import { Test, TestingModule } from '@nestjs/testing';
import { ActivityEntryController } from './activity-entry.controller';

describe('ActivityEntryController', () => {
  let controller: ActivityEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityEntryController],
    }).compile();

    controller = module.get<ActivityEntryController>(ActivityEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
