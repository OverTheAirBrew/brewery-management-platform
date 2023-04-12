import { Inject, Injectable } from '@nestjs/common';
import {
  Actor,
  ActorIdentifier,
  Device,
  Form,
  Sensor,
  SensorIdentifier,
} from '@overtheairbrew/shared';

@Injectable()
export class LocalDevice extends Device<{}> {
  constructor(
    @Inject(ActorIdentifier) public actors: Actor<any, any>[],
    @Inject(SensorIdentifier) public sensors: Sensor<any, any>[]
  ) {
    super(
      new Form().addString('hello', {
        required: true,
      })
    );
  }
}
