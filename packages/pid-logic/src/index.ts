import { PluginConfig } from '@overtheairbrew/plugins';
import { PidLogic } from './logic';
import { PidLogicModule } from './module';

const config: PluginConfig = {
  type: 'logic',
  modules: [PidLogicModule],
  logics: [PidLogic],
};

export default config;
