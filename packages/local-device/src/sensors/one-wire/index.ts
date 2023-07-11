import { Inject, Injectable } from '@nestjs/common';
import { IOneWireController } from '@overtheairbrew/one-wire-sensor/dist';
import { Form, ISensorProps, Sensor } from '@overtheairbrew/plugins';
import { existsSync } from 'fs';
import { ILocalDeviceConfig } from '../../device';

export interface IOneWireParams {
  sensorAddress: string;
  offset: number;
}

@Injectable()
export class OneWireSensor extends Sensor<ILocalDeviceConfig, IOneWireParams> {
  constructor(
    @Inject(IOneWireController) private oneWireController: IOneWireController,
  ) {
    console.log('CONSTRUCTOR', oneWireController);

    super(
      new Form()
        .addSelectBox('Sensor Address', {
          required: true,
          values: async () => await this.getSensors(),
        })
        .addInteger('Offset', {
          required: true,
          defaultValue: 0,
        }),
    );
  }

  public async isAvailable(): Promise<boolean> {
    return existsSync('/sys/bus/w1/devices');
  }

  private async deviceExists(address: string) {
    console.log('TESTING', this.oneWireController);

    const devices = await this.oneWireController.findDevices();
    return devices.includes(address);
  }

  private async getSensors() {
    console.log('TESTING', this.oneWireController);

    const sensors = await this.oneWireController.findDevices();
    return sensors;
  }

  protected async process(params: ISensorProps<{}, IOneWireParams>) {
    const sensorAddress = params.sensor.sensorAddress;

    if (!(await this.deviceExists(sensorAddress))) return null;

    const temperatureReading = await this.oneWireController.getCurrentValue(
      params.sensor.sensorAddress,
    );

    const offset = params.sensor.offset || 0;
    const tempWithOffset = temperatureReading.celsius + offset;

    return tempWithOffset;
  }
}
