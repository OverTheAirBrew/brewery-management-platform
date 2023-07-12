import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { v4 as uuid } from 'uuid';
import { AppModule } from '../src/app.module';
import { IRepositories, cleanup } from './cleanup';

describe('DevicesController (e2e)', () => {
  let app: INestApplication;
  let repositories: IRepositories;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repositories = await cleanup(moduleFixture);
  });

  it('GET /', async () => {
    const [{ id }] = await repositories.devices.bulkCreate([
      {
        name: 'testing-1',
        type_id: 'LocalDevice',
        config: {},
      },
    ]);

    const { status, body } = await request(app.getHttpServer())
      .get('/devices')
      .send();

    expect(status).toBe(200);
    expect(body).toMatchObject([
      {
        id,
        name: 'testing-1',
        type_id: 'LocalDevice',
        config: {},
      },
    ]);
  });

  it('GET /:device_id', async () => {
    const [{ id }] = await repositories.devices.bulkCreate([
      {
        name: 'testing-1',
        type_id: 'LocalDevice',
        config: {},
      },
    ]);

    const { status, body } = await request(app.getHttpServer())
      .get(`/devices/${id}`)
      .send();

    expect(status).toBe(200);
    expect(body).toMatchObject({
      id,
      name: 'testing-1',
      type_id: 'LocalDevice',
      config: {},
    });
  });

  it('POST /', async () => {
    const name = `test-device-${uuid()}`;

    const { status, body } = await request(app.getHttpServer())
      .post('/devices')
      .send({
        name,
        type_id: 'LocalDevice',
        config: {},
      });

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');

    const device = await repositories.devices.findByPk(body.id);

    expect(device.toJSON()).toMatchObject({
      id: body.id,
      name,
      config: {},
    });
  });
});
