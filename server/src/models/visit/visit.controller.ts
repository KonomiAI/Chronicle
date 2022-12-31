import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Auth } from 'src/auth/role.decorator';
import { Actions, Features } from 'src/auth/constants';
import { GetUser } from 'src/auth/user.decorator';
import { Staff } from '@prisma/client';
import { Auditable } from 'src/auth/audit.decorator';
import { VALIDATION_PIPE_OPTION } from 'src/utils/consts';
import { FilterVisitDto } from './dto/filter-visit.dto';

@Controller('visits')
@UseInterceptors(TransformInterceptor)
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Auth(Actions.WRITE, [Features.Entry])
  @Auditable()
  @Post()
  create(@Body() createVisitDto: CreateVisitDto, @GetUser() { id }: Staff) {
    return this.visitService.create(createVisitDto, id);
  }

  @Auth(Actions.READ, [Features.Entry])
  @Get()
  findAll(
    @Query(new ValidationPipe(VALIDATION_PIPE_OPTION)) params: FilterVisitDto,
  ) {
    return this.visitService.findAll(params);
  }

  @Auth(Actions.READ, [Features.Entry])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitService.findOne(id);
  }

  @Auth(Actions.WRITE, [Features.Entry])
  @Auditable()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitService.update(id, updateVisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitService.remove(id);
  }
}
