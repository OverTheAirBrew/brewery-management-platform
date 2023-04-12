import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DS18B20Controller } from '@overtheairbrew/one-wire-sensor';
import {
  Actor,
  ActorIdentifier,
  Sensor,
  SensorIdentifier,
} from '@overtheairbrew/shared';
import { LocalDevice } from './device';
import { DummyActor } from './src/actors/dummy';
import { GpioActor } from './src/actors/gpio';

import { DummySensor } from './src/sensors/dummy';
import { OneWireSensor } from './src/sensors/one-wire';

const Actors = [GpioActor, DummyActor];
const Sensors = [OneWireSensor, DummySensor];

@Module({
  providers: [
    ConfigService,
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
