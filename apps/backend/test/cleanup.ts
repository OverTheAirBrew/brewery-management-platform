import { TestingModule } from '@nestjs/testing';
import { REPOSITORIES } from '../src/data/database.abstractions';
import { Device } from '../src/data/entities/device.entity';

export interface IRepositories {
  // sensors: typeof Sensor;
  // actors: typeof Actor;
  // kettles: typeof Kettle;
  // telemetry: typeof Telemetry;
  devices: typeof Device;
}

export const cleanup = async (module: TestingModule) => {
  // These should be in the correct order to stop FK's failing during a delete
  const databases: IRepositories = {
    devices: module.get(REPOSITORIES.DeviceRepository),
  };

  for (const database of Object.keys(databases)) {
    await databases[database].destroy({ where: {} });
  }

  return databases;
};
