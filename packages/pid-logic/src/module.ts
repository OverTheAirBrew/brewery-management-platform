import { Module } from '@nestjs/common';
import { PidLogic } from './logic';

const Logics = [PidLogic];

@Module({
  providers: [...Logics],
  exports: [PidLogic],
})
export class PidLogicModule {}
