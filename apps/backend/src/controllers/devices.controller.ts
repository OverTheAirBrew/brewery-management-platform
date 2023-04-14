import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { DeviceInput, IdResponseOutput } from '@overtheairbrew/shared';
import { DevicesService } from '../lib/services/devices.service';

@Controller('/devices')
export class DeviceController {
  constructor(private service: DevicesService) {}

  @Post('/')
  @ApiCreatedResponse({
    type: IdResponseOutput,
  })
  @HttpCode(HttpStatus.CREATED)
  async createDevice(@Body() device: DeviceInput) {
    const id = await this.service.createDevice(device);
    return new IdResponseOutput(id);
  }
}
