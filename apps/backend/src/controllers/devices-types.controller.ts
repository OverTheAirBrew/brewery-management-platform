import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { DeviceTypeOutput } from '@overtheairbrew/shared';
import { DeviceTypesService } from '../lib/services/device-types.service';

@Controller('/device-types')
export class DeviceTypesController {
  constructor(private deviceTypesService: DeviceTypesService) {}

  @Get('/')
  @ApiOkResponse({
    type: DeviceTypeOutput,
    description:
      'Returns a list of device types with their corresponding form properties.',
    isArray: true,
  })
  async getDeviceTypes() {
    return await this.deviceTypesService.getDeviceTypes();
  }
}
