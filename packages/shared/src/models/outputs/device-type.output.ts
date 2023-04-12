import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class StringPropertyOutput {
  constructor(name: string, required: boolean, placeholder: string) {
    this.name = name;
    this.type = 'string';
    this.required = required;
    this.placeholder = placeholder;
  }

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  type: string;

  @ApiProperty({
    type: 'boolean',
  })
  required: boolean;

  @ApiProperty({
    type: 'string',
  })
  placeholder: string;
}

export class NumberPropertyOutput {
  constructor(name: string, required: boolean, defaultValue: number) {
    this.name = name;
    this.type = 'number';
    this.required = required;
    this.defaultValue = defaultValue;
  }

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  type: string;

  @ApiProperty({
    type: 'boolean',
  })
  required: boolean;

  @ApiProperty({
    type: 'number',
  })
  defaultValue: number;
}

export class SelectBoxPropertyOutput {
  constructor(
    name: string,
    required: boolean,
    values: string[],
    defaultValue: string
  ) {
    this.name = name;
    this.type = 'select-box';
    this.required = required;
    this.values = values;
    this.defaultValue = defaultValue;
  }

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  type: string;

  @ApiProperty({
    type: 'boolean',
  })
  required: boolean;

  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  values: string[];

  @ApiProperty({
    type: 'string',
  })
  defaultValue: string;
}

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
