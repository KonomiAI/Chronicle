import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async getTest(): Promise<any> {
    const results = await this.appService.getTest();
    return results;
  }

  @Get('test2')
  async getTest2(): Promise<any> {
    const results = await this.appService.getTest2();
    return results;
  }
}
