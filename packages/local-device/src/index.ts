import { PluginConfig } from '@overtheairbrew/plugins';
import { LocalDevice } from './device';
import { LocalDeviceModule } from './module';

const config: PluginConfig = {
  type: 'devices',
  modules: [LocalDeviceModule],
  devices: [LocalDevice],
};

export default config;
