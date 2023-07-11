import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogicTypeOutput } from '@overtheairbrew/shared';
import { LogicTypesService } from '../lib/services/logic-types.service';

@Controller('/logic-types')
@ApiTags('Logic Types')
export class LogicTypesController {
  constructor(private logicTypesService: LogicTypesService) {}

  @Get('/')
  @ApiOkResponse({
    type: LogicTypeOutput,
    description:
      'Returns a list of logic types with their corresponding form properties.',
    isArray: true,
  })
  async getLogicTypes() {
    return await this.logicTypesService.getLogicTypes();
  }
}
