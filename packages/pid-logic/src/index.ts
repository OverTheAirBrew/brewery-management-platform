import { PluginConfig } from '@overtheairbrew/shared';
import { PidLogic } from './logic';
import { PidLogicModule } from './module';

const config: PluginConfig = {
  type: 'logics',
  modules: [PidLogicModule],
  logics: [PidLogic],
};

export default config;
