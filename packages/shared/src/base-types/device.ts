import { ClassType } from '../class-type';
import { Form } from '../input-types/form';

export interface IDevice<T> {
  getConfigOptions(): Promise<any>;
}

export const IDevice = class Dummy {} as ClassType<IDevice<any>>;

export abstract class Device<T> implements IDevice<T> {
  public name: string;

  constructor(private configOptions: Form = new Form()) {
    this.name = this.constructor.name;
  }

  async getConfigOptions(): Promise<any> {
    return await this.configOptions.build();
  }
}
