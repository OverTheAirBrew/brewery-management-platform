import { Inject, Injectable } from '@nestjs/common';
import { DeviceInput } from '@overtheairbrew/shared';
import { object, string, TestContext } from 'yup';
import { REPOSITORIES } from '../../data/database.abstractions';
import { Device } from '../../data/entities/device.entity';
import { DeviceTypesService } from './device-types.service';

const createSchema = object({
  name: string().required(),
  type_id: string().test('is-valid-type', async (value, context) => {
    console.log(context);

    const { options } = context as TestContext<{
      deviceTypeService: DeviceTypesService;
    }>;

    return options.context.deviceTypeService.isValidDeviceType(value);
  }),
  config: object().test('is-valid', async (value, context) => {
    const { options, parent } = context as TestContext<{
      deviceTypeService: DeviceTypesService;
    }>;

    return await options.context.deviceTypeService.validateDeviceTypeConfiguration(
      parent.type_id,
      value,
    );
  }),
});

@Injectable()
export class DevicesService {
  constructor(
    @Inject(REPOSITORIES.DeviceRepository) private repository: typeof Device,
    private deviceTypeService: DeviceTypesService,
  ) {}

  async createDevice(device: DeviceInput) {
    await createSchema.validate(device, {
      context: {
        deviceTypeService: this.deviceTypeService,
      },
    });

    const createdDevice = await this.repository.create({
      name: device.name,
      type_id: device.type_id,
      config: device.config,
    });

    return createdDevice.id;
  }
}
