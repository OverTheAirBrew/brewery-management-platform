import { Injectable } from '@nestjs/common';

import { Actor, IActor, IActorProps } from '@overtheairbrew/plugins';

interface IDummyActorProps {}

@Injectable()
export class DummyActor
  extends Actor<{}, IDummyActorProps>
  implements IActor<{}, IDummyActorProps>
{
  constructor() {
    super();
  }

  protected async processOn() {}

  protected async processOff() {}

  protected async processCurrentState(
    params: IActorProps<{}, IDummyActorProps>
  ): Promise<{ state: 'on' | 'off' }> {
    return {
      state: 'on',
    };
  }
}
