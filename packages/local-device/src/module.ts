import { Module } from '@nestjs/common';
import { DS18B20Controller } from '@overtheairbrew/one-wire-sensor';
import {
  Actor,
  ActorIdentifier,
  Sensor,
  SensorIdentifier,
} from '@overtheairbrew/shared';
import { DummyActor } from './actors/dummy';
import { GpioActor } from './actors/gpio';
import { LocalDevice } from './device';

import { DummySensor } from './sensors/dummy';
import { OneWireSensor } from './sensors/one-wire';

const Actors = [GpioActor, DummyActor];
const Sensors = [OneWireSensor, DummySensor];

@Module({
  providers: [
    DS18B20Controller,
    ...Actors,
    ...Sensors,
    {
      provide: ActorIdentifier,
      useFactory: (...actors: Actor<any, any>[]) => {
        return actors.filter(async (actor) => await actor.isAvailable());
      },
      inject: [...Actors],
    },
    {
      provide: SensorIdentifier,
      useFactory: (...sensors: Sensor<any, any>[]) => {
        return sensors.filter(async (sensor) => await sensor.isAvailable());
      },
      inject: [...Sensors],
    },
    LocalDevice,
  ],
  exports: [LocalDevice],
  imports: [],
})
export class LocalDeviceModule {}
