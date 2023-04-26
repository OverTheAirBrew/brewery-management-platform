import { Inject, Injectable } from '@nestjs/common';
import { DeviceInput, DeviceOutput } from '@overtheairbrew/shared';
import { TestContext, object, string } from 'yup';
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

const updateSchema = createSchema.shape({
  id: string().required().uuid(),
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

  async getDevices() {
    const devices = await this.repository.findAll();
    return await Promise.all(devices.map(this.mapDevice));
  }

  async getDevice(device_id: string) {
    const device = await this.repository.findByPk(device_id);

    if (!device) throw new Error(`Device with id ${device_id} was not found.`);

    return await this.mapDevice(device);
  }

  private async mapDevice(device: Device) {
    return new DeviceOutput(
      device.id,
      device.name,
      device.type_id,
      device.config,
    );
  }
}
