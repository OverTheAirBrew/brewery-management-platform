import { DynamicModule, Module } from '@nestjs/common';
import {
  Device,
  DeviceIdentifier,
  Logic,
  LogicIdentifier,
} from '@overtheairbrew/plugins';
import { findNodeModulesMatchingRegex } from '../utilities/find-node-modules-matching-regex';
import { findPluginConfigurationsOfType } from '../utilities/find-plugin-configurations-of-type';

@Module({})
export class PluginModule {
  static register(): DynamicModule {
    const plugins = findNodeModulesMatchingRegex(
      /((@[\w-]*)\/)?(otabmp-[\w-]*)$/,
    );

    const pluginImplementations = plugins.map((plugin) => {
      const req = require(plugin.path);
      return req.default;
    });

    const modules = findPluginConfigurationsOfType(
      pluginImplementations,
      'modules',
    );
    const devices = findPluginConfigurationsOfType(
      pluginImplementations,
      'devices',
    );
    const logics = findPluginConfigurationsOfType(
      pluginImplementations,
      'logics',
    );

    return {
      module: PluginModule,
      imports: [...modules],
      providers: [
        {
          provide: DeviceIdentifier,
          useFactory: (devices: Device<any>[] | Device<any>) => {
            return Array.isArray(devices) ? [...devices] : [devices];
          },
          inject: [...devices],
        },
        {
          provide: LogicIdentifier,
          useFactory: (logics: Logic<any>[] | Logic<any>) => {
            return Array.isArray(logics) ? [...logics] : [logics];
          },
          inject: [...logics],
        },
      ],
      exports: [DeviceIdentifier, LogicIdentifier],
    };
  }
}
