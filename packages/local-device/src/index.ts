import { LocalDevice } from './device';
import { LocalDeviceModule } from './module';

const config = {
  modules: [LocalDeviceModule],
  devices: [LocalDevice],
};

export default config;
