import {
  NumberPropertyOutput,
  SelectBoxPropertyOutput,
  StringPropertyOutput,
} from '@overtheairbrew/plugins';

export type PropertyOutputs =
  | StringPropertyOutput
  | NumberPropertyOutput
  | SelectBoxPropertyOutput;
