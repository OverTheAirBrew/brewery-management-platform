import { DynamicModule, Module } from '@nestjs/common';
import {
  Device,
  DeviceIdentifier,
  Logic,
  LogicIdentifier,
  PluginConfig,
  PluginType,
} from '@overtheairbrew/shared';

import findNodeModules from 'find-node-modules';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

interface PackageJSON {
  name: string;
  version: string;
  keywords?: string[];
  exports?: string | Record<string, string | Record<string, string>>;
  main?: string;
  type?: 'module' | 'commonjs';
  engines?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

const loadPackageJson = (pluginPath: string) => {
  const packageJsonPath = join(pluginPath, 'package.json');
  let packageJson: PackageJSON;

  if (!existsSync(packageJsonPath)) {
    throw new Error(`Plugin ${pluginPath} does not contain a package.json.`);
  }

  try {
    packageJson = JSON.parse(
      readFileSync(packageJsonPath, { encoding: 'utf8' }),
    );
  } catch (err) {
    throw new Error(
      `Plugin ${pluginPath} contains an invalid package.json. Error ${err}`,
    );
  }

  return packageJson;
};

const findNodeModulesMatchingRegex = (regex: RegExp) => {
  const loadDefaultPaths = () => {
    const nodeModulesPaths = findNodeModules({ relative: false });

    if (require.main) {
      nodeModulesPaths.push(...require.main.paths);
    }

    return [...new Set(nodeModulesPaths)];
  };

  const nodeModules = loadDefaultPaths();

  const processDirectory = (directory: string) => {
    if (!existsSync(directory)) return;

    const subDirectory = readdirSync(directory);

    const packageDirectories: string[] = [];

    for (const dir of subDirectory) {
      if (existsSync(join(directory, dir, 'package.json'))) {
        packageDirectories.push(join(directory, dir));
      } else {
        if (['.bin', '.package-lock.json', '.DS_Store', '.cache'].includes(dir))
          continue;

        const packages = processDirectory(join(directory, dir));

        if (!packages) continue;
        packageDirectories.push(...packages);
      }
    }

    return packageDirectories;
  };

  const loadedPackages: string[] = [];

  for (const nodeModule of nodeModules) {
    const directories = processDirectory(nodeModule);

    if (!directories) continue;
    loadedPackages.push(...directories);
  }

  const dedupedPackages = [
    ...new Set(loadedPackages.filter((pack) => pack.match(regex))),
  ];

  const packages = dedupedPackages.map((p) => {
    const packageJson = loadPackageJson(p);

    return {
      path: p,
      packageJson,
    };
  });

  return packages;
};

const dedupeArray = (plugins: PluginConfig[], key: PluginType | 'modules') => {
  return plugins.reduce((prev, curr) => {
    if (!curr[key]) {
      return [...prev];
    }

    return [...prev, ...curr[key]];
  }, []);
};

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

    const modules = dedupeArray(pluginImplementations, 'modules');
    const devices = dedupeArray(pluginImplementations, 'devices');
    const logics = dedupeArray(pluginImplementations, 'logics');

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
