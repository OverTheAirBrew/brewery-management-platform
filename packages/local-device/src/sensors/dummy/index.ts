import { Injectable } from '@nestjs/common';
import { Form, ISensorProps, Sensor } from '@overtheairbrew/plugins';

interface IDummySensorProps {
  values: string;
}

@Injectable()
export class DummySensor extends Sensor<{}, IDummySensorProps> {
  constructor() {
    super(new Form());
  }

  private async validateValues(values: string) {
    const valuesSplit = values.split(',');
    return valuesSplit.every((val) => parseInt(val) || false);
  }

  protected async process(params: ISensorProps<{}, IDummySensorProps>) {
    const values = params.sensor.values
      .split(',')
      .map((val: any) => parseInt(val));
    return values[Math.floor(Math.random() * values.length)];
  }
}
