import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class IndexController {
  @Get()
  getIndex() {
    return {
      name: '@overtheairbrew/backend',
      version: process.env.VERSION || '0.0.0-dev',
      uptime: process.uptime(),
    };
  }

  @Get('/health')
  health() {
    return {};
  }
}
