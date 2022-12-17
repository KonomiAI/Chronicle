import { Test, TestingModule } from '@nestjs/testing';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';

describe('VisitController', () => {
  let controller: VisitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitController],
      providers: [VisitService],
    }).compile();

    controller = module.get<VisitController>(VisitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
