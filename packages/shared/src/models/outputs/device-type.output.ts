import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  NumberPropertyOutput,
  SelectBoxPropertyOutput,
  StringPropertyOutput,
} from '@overtheairbrew/plugins';

@ApiExtraModels(
  StringPropertyOutput,
  NumberPropertyOutput,
  SelectBoxPropertyOutput
)
export class DeviceTypeOutput {
  constructor(name: string, properties: StringPropertyOutput[]) {
    this.name = name;
    this.properties = properties;
  }

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(StringPropertyOutput) },
      { $ref: getSchemaPath(NumberPropertyOutput) },
      { $ref: getSchemaPath(SelectBoxPropertyOutput) },
    ],
    type: () => Object,
    isArray: true,
  })
  properties: (
    | StringPropertyOutput
    | SelectBoxPropertyOutput
    | NumberPropertyOutput
  )[];
}
