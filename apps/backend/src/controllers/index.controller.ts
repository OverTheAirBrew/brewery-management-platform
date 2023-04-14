import { Controller, Get } from '@nestjs/common';

@Controller()
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
