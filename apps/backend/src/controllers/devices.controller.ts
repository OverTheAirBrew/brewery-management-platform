import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ActorTypeOutput,
  DeviceInput,
  DeviceOutput,
  IdResponseOutput,
  SensorTypeOutput,
} from '@overtheairbrew/shared';
import { DevicesService } from '../lib/services/devices.service';

@Controller('/devices')
@ApiTags('Devices')
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

  @Get('/:device_id/sensor-types')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: SensorTypeOutput,
    isArray: true,
  })
  async getDeviceSensorTypes(@Param('device_id') device_id: string) {
    return await this.service.getSensorTypes(device_id);
  }

  @Get('/:device_id/actor-types')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: ActorTypeOutput,
    isArray: true,
  })
  async getDeviceActorTypes(@Param('device_id') device_id: string) {
    return await this.service.getActorTypes(device_id);
  }
}
