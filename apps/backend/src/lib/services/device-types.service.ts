import { Inject, Injectable } from '@nestjs/common';
import { DeviceTypeOutput } from '@overtheairbrew/shared';

import { Device, DeviceIdentifier } from '@overtheairbrew/plugins';

@Injectable()
export class DeviceTypesService {
  constructor(@Inject(DeviceIdentifier) private devices: Device<any>[]) {}

  async getDeviceTypes() {
    return await Promise.all(this.devices.map(this.mapDeviceType));
  }

  async getRawDeviceType(deviceTypeId: string) {
    const deviceType = this.devices.find(
      (device) => device.name === deviceTypeId,
    );

    return deviceType;
  }

  public isValidDeviceType(deviceType: string) {
    return this.devices.some((device) => device.name === deviceType);
  }

  public async validateDeviceTypeConfiguration(
    deviceType: string,
    config: any,
  ) {
    const device = this.devices.find((device) => device.name === deviceType);

    if (!device) throw new Error('Invalid device');

    return device.validateConfiguration(config);
  }

  private async mapDeviceType(device: Device<any>): Promise<DeviceTypeOutput> {
    const properties = await device.getConfigOptions(undefined);

    return new DeviceTypeOutput(device.name, properties);
  }
}
