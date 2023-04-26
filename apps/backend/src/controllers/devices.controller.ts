import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  DeviceInput,
  DeviceOutput,
  IdResponseOutput,
} from '@overtheairbrew/shared';
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

  @Get('/')
  @ApiOkResponse({
    type: DeviceOutput,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  async getDevices() {
    return await this.service.getDevices();
  }

  @Get('/:device_id')
  @ApiOkResponse({
    type: DeviceOutput,
  })
  @HttpCode(HttpStatus.OK)
  async getDevice(@Param('device_id') device_id: string) {
    return await this.service.getDevice(device_id);
  }
}
