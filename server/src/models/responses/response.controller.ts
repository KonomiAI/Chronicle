import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { CreateResponseDto, UpdateResponseDto } from './response.dto';
import { ResponseService } from './response.service';
import { Auth } from '../../auth/role.decorator';
import { Actions, Features } from '../../auth/constants';

@Controller('responses')
@UseInterceptors(TransformInterceptor)
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Auth(Actions.WRITE, [
    Features.Form,
    Features.Customer,
    Features.Entry,
    Features.Inventory,
    Features.Security,
  ])
  @Post()
  async createResponse(@Body() data: CreateResponseDto, @Request() req) {
    const response = await this.responseService.createResponse();
    return this.responseService.attachResponse(
      response.id,
      data.formVersionId,
      req.user.id,
      data.body,
    );
  }

  @Auth(Actions.WRITE, [
    Features.Form,
    Features.Customer,
    Features.Entry,
    Features.Inventory,
    Features.Security,
  ])
  @Put(':id')
  async updateResponse(
    @Param('id') id: string,
    @Body() data: UpdateResponseDto,
    @Request() req,
  ) {
    return this.responseService.attachResponse(
      id,
      data.formVersionId,
      req.user.id,
      data.body,
    );
  }
}
