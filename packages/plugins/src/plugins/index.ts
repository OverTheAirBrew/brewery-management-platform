import { Device, Logic } from '../base-types';

export type PluginType = 'devices' | 'logics';

export type PluginConfig = { type: PluginType; modules: any[] } & (
  | IDevicePluginConfig
  | ILogicPluginConfig
);

interface IDevicePluginConfig {
  devices: (abstract new (...args: any[]) => Device<any>)[];
}

interface ILogicPluginConfig {
  logics: (abstract new (...args: any[]) => Logic<any>)[];
}
