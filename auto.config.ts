import { INpmConfig } from '@auto-it/npm';
import { AutoRc } from 'auto';

const npmOptions: INpmConfig = {
  exact: true,
};

/** Auto configuration */
export default function rc(): AutoRc {
  return {
    plugins: ['released', ['npm', npmOptions], ['docker', { latest: true }]],
  };
}
