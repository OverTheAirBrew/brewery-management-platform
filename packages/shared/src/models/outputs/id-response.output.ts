import { ApiProperty } from '@nestjs/swagger';

export class IdResponseOutput {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    type: 'string',
  })
  id: string;
}
