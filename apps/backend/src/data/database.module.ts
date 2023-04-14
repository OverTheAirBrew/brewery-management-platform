import { Module } from '@nestjs/common';
import { REPOSITORIES } from './database.abstractions';
import { databaseProvider } from './database.provider';
import { Device } from './entities/device.entity';

const RepositoryEntries = Object.entries(REPOSITORIES).map(
  ([_, value]) => value,
);

@Module({
  providers: [
    databaseProvider,
    {
      provide: REPOSITORIES.DeviceRepository,
      useValue: Device,
    },
  ],
  exports: [databaseProvider, ...RepositoryEntries],
})
export class DatabaseModule {}
