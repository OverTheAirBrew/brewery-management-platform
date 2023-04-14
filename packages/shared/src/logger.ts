import { ClassType } from '../../plugins/src/class-type';

export interface ILogger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(error: Error, ...args: any[]): void;
}

export const ILogger = class Dummy {} as ClassType<ILogger>;
