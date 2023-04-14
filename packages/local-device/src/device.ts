import { Inject, Injectable } from '@nestjs/common';
import {
  Actor,
  ActorIdentifier,
  Device,
  Sensor,
  SensorIdentifier,
} from '@overtheairbrew/shared';

@Injectable()
export class LocalDevice extends Device<{}> {
  constructor(
    @Inject(ActorIdentifier) public actors: Actor<any, any>[],
    @Inject(SensorIdentifier) public sensors: Sensor<any, any>[]
  ) {
    super();
  }

  async validateConfiguration(config: {}): Promise<boolean> {
    // We don't need to validate the config as there isn't any
    return Object.keys(config).length === 0;
  }
}
