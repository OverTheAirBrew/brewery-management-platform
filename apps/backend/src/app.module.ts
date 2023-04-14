import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { DeviceTypesController } from './controllers/devices-types.controller';
import { DeviceController } from './controllers/devices.controller';
import { IndexController } from './controllers/index.controller';
import { LogicTypesController } from './controllers/logic-types.controller';
import databaseConfig from './data/database.config';
import { DatabaseModule } from './data/database.module';
import { PluginModule } from './lib/plugins/plugin.module';
import { DeviceTypesService } from './lib/services/device-types.service';
import { DevicesService } from './lib/services/devices.service';
import { LogicTypesService } from './lib/services/logic-types.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    PluginModule.register(),
  ],
  controllers: [
    IndexController,
    DeviceTypesController,
    LogicTypesController,
    DeviceController,
  ],
  providers: [
    AppService,
    DeviceTypesService,
    LogicTypesService,
    DevicesService,
  ],
})
export class AppModule {}
