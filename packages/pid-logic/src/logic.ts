import { Injectable, Optional } from '@nestjs/common';
import { Form, Logic } from '@overtheairbrew/plugins';

interface IPidLogicParams {
  p: number;
  i: number;
  d: number;
  max?: number;

  runParams?: {
    lastCalc?: number;
    lastOutput?: number;
    lastInput?: number;
    iTerm?: number;
  };
}

@Injectable()
export class PidLogic extends Logic<IPidLogicParams> {
  constructor(@Optional() private sample_time = 5) {
    super(
      new Form()
        .addInteger('p', {
          required: true,
          defaultValue: 0,
        })
        .addInteger('i', {
          required: true,
          defaultValue: 0,
        })
        .addInteger('d', {
          required: true,
          defaultValue: 0,
        })
        .addInteger('max', { required: false }),
    );
  }

  protected async process(
    params: IPidLogicParams,
    currentTemp: number,
    targetTemp: number,
  ): Promise<{
    heatTime: number;
    waitTime: number;
    nextParams: IPidLogicParams;
  }> {
    return await this.calculate(params, currentTemp, targetTemp);
  }

  private async calculate(
    params: IPidLogicParams,
    currentTemp: number,
    targetTemp: number,
  ) {
    const kp = params.p;
    const ki = params.i * this.sample_time;
    const kd = params.d / this.sample_time;

    const sampleTime = this.sample_time * 1000;

    let runParams = {
      lastCalc: 0,
      lastOutput: 0,
      lastInput: 0,
      iTerm: 0,
      ...params.runParams,
    };

    const now = new Date().getTime();

    if (!(now - runParams.lastCalc < sampleTime)) {
      const min = 0;
      const max = params.max || 100;

      const error = targetTemp - currentTemp;
      const dInput = currentTemp - runParams.lastInput;

      if (runParams.lastOutput < max && runParams.lastCalc > min) {
        runParams.iTerm += ki * error;
        runParams.iTerm = Math.min(runParams.iTerm, max);
        runParams.iTerm = Math.max(runParams.iTerm, min);
      }

      const p = kp * error;
      const i = runParams.iTerm;
      const d = kd * dInput;

      runParams.lastOutput = p + i + d;
      runParams.lastOutput = Math.min(runParams.lastOutput, max);
      runParams.lastOutput = Math.max(runParams.lastOutput, min);

      runParams.lastInput = currentTemp;

      runParams.lastCalc = now;
    }

    const heatTime = ((this.sample_time * runParams.lastOutput) / 100) * 1000;

    return {
      heatTime,
      waitTime: sampleTime - heatTime,
      nextParams: {
        ...params,
        runParams,
      },
    };
  }
}
