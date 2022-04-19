import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
@UseInterceptors(TransformInterceptor)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  getAllCustomers() {
    return this.customerService.listCustomers();
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    const res = await this.customerService.findCustomer({
      id,
    });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  @Post()
  createCustomer(@Body() { dateOfBirth, ...data }: CustomerDto) {
    return this.customerService.createCustomer({
      data: {
        ...data,
        dateOfBirth: new Date(dateOfBirth),
      },
    });
  }

  @Put(':id')
  async updateCustomer(
    @Body() { dateOfBirth, ...data }: CustomerDto,
    @Param('id') id: string,
  ) {
    await this.getCustomer(id);
    return this.customerService.updateCustomer({
      data: {
        ...data,
        dateOfBirth: new Date(dateOfBirth),
      },
      id,
    });
  }

  @Delete(':id')
  async deleteCustomerPersonalInfo(@Param('id') id: string) {
    await this.customerService.deleteCustomer({ id });
    return { id };
  }
}
