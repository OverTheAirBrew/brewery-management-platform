import { Module } from '@nestjs/common';
import {
  DS18B20Controller,
  IOneWireController,
} from '@overtheairbrew/one-wire-sensor/dist';
import {
  Actor,
  ActorIdentifier,
  Sensor,
  SensorIdentifier,
} from '@overtheairbrew/plugins';
import { DummyActor } from './actors/dummy';
import { GpioActor } from './actors/gpio';
import { LocalDevice } from './device';

import { DummySensor } from './sensors/dummy';
import { OneWireSensor } from './sensors/one-wire';

const Actors = [GpioActor, DummyActor];
const Sensors = [OneWireSensor, DummySensor];

@Module({
  providers: [
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
    {
      provide: IOneWireController,
      useClass: DS18B20Controller,
    },
    LocalDevice,
  ],
  exports: [LocalDevice],
  imports: [],
})
export class LocalDeviceModule {}
