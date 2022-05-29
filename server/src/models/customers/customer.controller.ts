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
import { Prisma } from '@prisma/client';
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
    return this.customerService.listCustomers({
      select: {
        createdAt: true,
        dateOfBirth: true,
        email: true,
        firstName: true,
        gender: true,
        id: true,
        lastName: true,
        phone: true,
        updatedAt: true,
      },
    });
  }

  @Auth(Actions.READ, [Features.Customer])
  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    const res = await this.customerService.findCustomer({
      id,
      select: {
        createdAt: true,
        dateOfBirth: true,
        email: true,
        firstName: true,
        gender: true,
        id: true,
        lastName: true,
        phone: true,
        responses: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            latestResponseVersion: {
              include: {
                respondent: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
                formVersion: {
                  include: {
                    form: true,
                  },
                },
              },
            },
          },
        },
        updatedAt: true,
      },
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
  async updateCustomer(
    @Body() { responseIds, ...data }: CustomerDto,
    @Param('id') id: string,
  ) {
    // Check if customer exists, if not a 404 is automatically thrown
    await this.getCustomer(id);
    const updateData: Prisma.CustomerCreateInput = { ...data };
    if (responseIds?.length) {
      updateData.responses = { connect: responseIds.map((id) => ({ id })) };
    }
    return this.customerService.updateCustomer({
      data: updateData,
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
