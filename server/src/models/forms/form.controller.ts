import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
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
  async getForms() {
    return this.formService.forms({ select: DEFAULT_FORM_SELECT });
  }

  @Get(':id')
  async getForm(@Param('id') id: string) {
    return this.formService.form(
      {
        id,
      },
      DEFAULT_FORM_SELECT,
    );
  }

  @Get('version/:id')
  async getFormVersion(@Param('id') id: string) {
    return this.formService.formVersion({
      id,
    });
  }

  @Post()
  async createForm(@Body() { body, ...data }: CreateFormDto) {
    const initialForm = await this.formService.createForm(
      data,
      DEFAULT_FORM_SELECT,
    );
    const formId = initialForm.id;
    return this.formService.attachVersion(formId, body, DEFAULT_FORM_SELECT);
  }

  @Put(':id')
  async updateForm(
    @Param('id') id: string,
    @Body() { body, ...data }: UpdateFormDto,
  ) {
    await this.formService.updateForm({
      where: { id },
      data,
      select: DEFAULT_FORM_SELECT,
    });
    return this.formService.attachVersion(id, body, DEFAULT_FORM_SELECT);
  }
}
