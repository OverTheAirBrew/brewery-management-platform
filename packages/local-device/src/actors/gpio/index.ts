import { Injectable } from '@nestjs/common';
import { Direction, Gpio } from 'onoff';

import { Actor, ActorState, IActor, IActorProps } from '@overtheairbrew/shared';

interface IGpioActorParams {
  gpio: number;
}

const gpioPinValues = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28,
];

@Injectable()
export class GpioActor
  extends Actor<{}, IGpioActorParams>
  implements IActor<{}, IGpioActorParams>
{
  private attachedGpios: Record<number, Gpio> = {};

  constructor() {
    super();
  }

  public async isAvailable(): Promise<boolean> {
    return Gpio.accessible;
  }

  protected async processOn(params: IActorProps<{}, IGpioActorParams>) {
    const gpio = await this.getGpioInstance(params.actor.gpio, 'out');
    gpio.writeSync(1);
  }

  protected async processOff(params: IActorProps<{}, IGpioActorParams>) {
    const gpio = await this.getGpioInstance(params.actor.gpio, 'out');
    gpio.writeSync(0);
  }

  protected async processCurrentState(
    params: IActorProps<{}, IGpioActorParams>
  ) {
    const gpio = await this.getGpioInstance(params.actor.gpio, 'out');
    const state = gpio.readSync();

    return {
      state: (state === 1 ? 'on' : 'off') as ActorState,
    };
  }

  private async getGpioInstance(gpioNumber: number, direction: Direction) {
    if (!this.attachedGpios[gpioNumber]) {
      this.attachedGpios[gpioNumber] = new Gpio(gpioNumber, direction);
    }

    return this.attachedGpios[gpioNumber];
  }
}
