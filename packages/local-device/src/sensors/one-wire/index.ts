import { Injectable } from '@nestjs/common';
import { DS18B20Controller } from '@overtheairbrew/one-wire-sensor';
import { Form, ISensorProps, Sensor } from '@overtheairbrew/shared';
import { existsSync } from 'fs';

export interface IOneWireParams {
  sensorAddress: string;
  offset: number;
}

@Injectable()
export class OneWireSensor extends Sensor<{}, IOneWireParams> {
  constructor(private oneWireController: DS18B20Controller) {
    super(
      new Form()
        .addSelectBox('Sensor Address', {
          required: true,
          values: () => this.getSensors(),
        })
        .addInteger('Offset', {
          required: true,
          defaultValue: 0,
        })
    );
  }

  public async isAvailable(): Promise<boolean> {
    return existsSync('/sys/bus/w1/devices');
  }

  private async deviceExists(address: string) {
    const devices = await this.oneWireController.findDevices();
    return devices.includes(address);
  }

  private async getSensors() {
    const sensors = await this.oneWireController.findDevices();
    return sensors;
  }

  protected async process(params: ISensorProps<{}, IOneWireParams>) {
    const sensorAddress = params.sensor.sensorAddress;

    if (!(await this.deviceExists(sensorAddress))) return null;

    const temperatureReading = await this.oneWireController.getCurrentValue(
      params.sensor.sensorAddress
    );

    const offset = params.sensor.offset || 0;
    const tempWithOffset = temperatureReading.celsius + offset;

    return tempWithOffset;
  }
}
