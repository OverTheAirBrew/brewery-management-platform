import { ClassType } from '../class-type';

export interface ILogic<T> {
  run: (
    params: T,
    currentTemp: number,
    targetTemp: number
  ) => Promise<{ heatTime: number; waitTime: number; nextParams: T }>;
}

export const ILogic = class Dummy {} as ClassType<ILogic<any>>;

export abstract class Logic<T> implements ILogic<T> {
  public async run(params: T, currentTemp: number, targetTemp: number) {
    return await this.process(params, currentTemp, targetTemp);
  }

  protected abstract process(
    params: T,
    currentTemp: number,
    targetTemp: number
  ): Promise<{ heatTime: number; waitTime: number; nextParams: T }>;
}
