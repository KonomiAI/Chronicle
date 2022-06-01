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
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
@UseInterceptors(TransformInterceptor)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Auth(Actions.READ, [Features.Customer])
  @Get()
  getAllCustomers() {
    return this.customerService.listCustomers();
  }

  @Auth(Actions.READ, [Features.Customer])
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

  @Auth(Actions.WRITE, [Features.Customer])
  @Post()
  createCustomer(@Body() data: CustomerDto) {
    return this.customerService.createCustomer({
      data,
    });
  }

  @Auth(Actions.WRITE, [Features.Customer])
  @Put(':id')
  async updateCustomer(@Body() data: CustomerDto, @Param('id') id: string) {
    await this.getCustomer(id);
    return this.customerService.updateCustomer({
      data,
      id,
    });
  }

  @Auth(Actions.WRITE, [Features.Customer])
  @Delete(':id')
  async deleteCustomerPersonalInfo(@Param('id') id: string) {
    await this.customerService.deleteCustomer({ id });
    return { id };
  }
}
