import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FormPurpose, Prisma } from '@prisma/client';
import { validateWithLatest } from '@konomi.ai/c-form';

import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { CreateFormDto, UpdateFormDto } from './form.dto';
import { FormService } from './form.service';
import { Auditable } from 'src/auth/audit.decorator';

const DEFAULT_FORM_SELECT = {
  id: true,
  title: true,
  description: true,
  purpose: true,
  createdAt: true,
  updatedAt: true,
  latestFormVersion: {
    select: {
      id: true,
      body: true,
    },
  },
};

@Controller('forms')
@UseInterceptors(TransformInterceptor)
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  @Auth(Actions.READ, [Features.Form])
  async getForms(
    @Query('purpose') purpose?: FormPurpose,
    @Query('title') title?: string,
  ) {
    const searchObj: Prisma.FormWhereInput = {};
    if (purpose) {
      searchObj.OR = [
        {
          purpose,
        },
        {
          purpose: 'NO_PURPOSE',
        },
      ];
    }
    if (title) {
      searchObj.title = {
        contains: title,
      };
    }
    const data: any[] = await this.formService.forms({
      select: DEFAULT_FORM_SELECT,
      where: searchObj,
    });
    data.sort((a) => {
      if (a.purpose === FormPurpose.NO_PURPOSE) {
        return 1;
      }
      return -1;
    });
    return data;
  }

  @Auth(Actions.READ, [Features.Form])
  @Get(':id')
  async getForm(@Param('id') id: string) {
    return this.formService.form(
      {
        id,
      },
      DEFAULT_FORM_SELECT,
    );
  }

  @Auth(Actions.READ, [Features.Form])
  @Get('version/:id')
  async getFormVersion(@Param('id') id: string) {
    return this.formService.formVersion({
      id,
    });
  }

  @Auth(Actions.WRITE, [Features.Form])
  @Post()
  @Auditable()
  async createForm(@Body() { body, ...data }: CreateFormDto) {
    if (!validateWithLatest(body)) {
      throw new HttpException(
        'Failed form validation.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const initialForm = await this.formService.createForm(
      data,
      DEFAULT_FORM_SELECT,
    );
    const formId = initialForm.id;
    return this.formService.attachVersion(formId, body, DEFAULT_FORM_SELECT);
  }

  @Auth(Actions.WRITE, [Features.Form])
  @Put(':id')
  @Auditable()
  async updateForm(
    @Param('id') id: string,
    @Body() { body, ...data }: UpdateFormDto,
  ) {
    if (!validateWithLatest(body)) {
      throw new HttpException(
        'Failed form validation.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.formService.updateForm({
      where: { id },
      data,
      select: DEFAULT_FORM_SELECT,
    });
    return this.formService.attachVersion(id, body, DEFAULT_FORM_SELECT);
  }
}
