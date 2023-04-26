import { ApiProperty } from '@nestjs/swagger';

export class DeviceOutput {
  constructor(id: string, name: string, type_id: string, config: any) {
    this.id = id;
    this.name = name;
    this.type_id = type_id;
    this.config = config;
  }

  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  type_id: string;

  @ApiProperty({
    type: 'object',
  })
  config: any;
}
