import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { validateWithLatest } from '@konomi.ai/c-form';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { CreateFormDto, UpdateFormDto } from './form.dto';
import { FormService } from './form.service';

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
  async getForms() {
    return this.formService.forms({ select: DEFAULT_FORM_SELECT });
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
  async createForm(@Body() { body, ...data }: CreateFormDto) {
    if (!validateWithLatest(data)) {
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
  async updateForm(
    @Param('id') id: string,
    @Body() { body, ...data }: UpdateFormDto,
  ) {
    if (!validateWithLatest(data)) {
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
