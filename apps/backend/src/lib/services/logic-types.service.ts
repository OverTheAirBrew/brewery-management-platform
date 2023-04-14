import { Inject, Injectable } from '@nestjs/common';
import { Logic, LogicIdentifier } from '@overtheairbrew/plugins';
import { LogicTypeOutput } from '@overtheairbrew/shared';

@Injectable()
export class LogicTypesService {
  constructor(@Inject(LogicIdentifier) private logics: Logic<any>[]) {}

  async getLogicTypes() {
    return await Promise.all(this.logics.map(this.mapLogicType));
  }

  private async mapLogicType(logic: Logic<any>): Promise<LogicTypeOutput> {
    const properties = await logic.getConfigOptions();
    return new LogicTypeOutput(logic.name, properties);
  }
}
