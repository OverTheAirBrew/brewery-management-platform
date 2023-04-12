import { ClassType } from '../class-type';

export interface IActorProps<TDevice, TProps> {
  device: TDevice;
  actor: TProps;
}

export interface IActor<TDevice, TProps> {
  on(params: IActorProps<TDevice, TProps>): Promise<void>;
  off(params: IActorProps<TDevice, TProps>): Promise<void>;
  getCurrentState(
    params: IActorProps<TDevice, TProps>
  ): Promise<{ state: ActorState }>;
  isAvailable(): Promise<boolean>;
}

export const IActor = class Dummy {} as ClassType<IActor<any, any>>;

export type ActorState = 'on' | 'off';

export abstract class Actor<TDevice, TProps>
  implements IActor<TDevice, TProps>
{
  public name: string;

  constructor() {
    this.name = this.constructor.name;
  }

  public async on(params: IActorProps<TDevice, TProps>) {
    await this.processOn(params);
  }

  public async off(params: IActorProps<TDevice, TProps>) {
    await this.processOff(params);
  }

  public async getCurrentState(params: IActorProps<TDevice, TProps>) {
    return await this.processCurrentState(params);
  }

  public async isAvailable(): Promise<boolean> {
    return true;
  }

  protected abstract processOn(
    params: IActorProps<TDevice, TProps>
  ): Promise<void>;
  protected abstract processOff(
    params: IActorProps<TDevice, TProps>
  ): Promise<void>;
  protected abstract processCurrentState(
    params: IActorProps<TDevice, TProps>
  ): Promise<{ state: ActorState }>;
}
