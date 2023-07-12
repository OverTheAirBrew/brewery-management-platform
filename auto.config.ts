import { INpmConfig } from '@auto-it/npm';
import { AutoRc } from 'auto';

const npmOptions: INpmConfig = {
  exact: true,
};

/** Auto configuration */
export default function rc(): AutoRc {
  return {
    plugins: ['released', 'conventional-commits', ['npm', npmOptions]],
  };
}
