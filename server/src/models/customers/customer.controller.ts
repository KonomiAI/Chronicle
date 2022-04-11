import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  getAllCustomers() {
    return this.customerService.listCustomers();
  }

  @Get(':id')
  getCustomer(@Param('id') id: string) {
    return this.customerService.findCustomer({
      id,
    });
  }

  @Post()
  createCustomer(@Body() data) {
    return this.customerService.createCustomer({ data });
  }

  @Put(':id')
  updateCustomer(@Body() data, @Param('id') id: string) {
    return this.customerService.updateCustomer({ data, id });
  }

  @Delete(':id')
  async deleteCustomerPersonalInfo(@Param('id') id: string) {
    await this.customerService.deleteCustomer({ id });
    return { id };
  }
}
