// import { Test } from '@nestjs/testing';
// import { SelectBoxProperty } from '@ota-internal/shared';
// import { Gpio } from 'onoff';
// import { GpioActor } from '.';

// jest.mock('onoff');

// const mockedGpio = jest.mocked(Gpio, true);

// describe('plugin/gpio', () => {
//   let service: GpioActor;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       providers: [GpioActor],
//     }).compile();

//     service = moduleRef.get(GpioActor);
//   });

//   it('should turn on when requested', async () => {
//     await service.on({ device: undefined, actor: { gpio: 10 } });

//     expect(mockedGpio.prototype.constructor).toHaveBeenCalledWith(10, 'out');

//     expect(mockedGpio.prototype.writeSync).toHaveBeenCalled();
//     expect(mockedGpio.prototype.writeSync).toHaveBeenCalledWith(1);
//   });

//   it('should turn off when requested', async () => {
//     await service.off({ device: undefined, actor: { gpio: 10 } });

//     expect(mockedGpio.prototype.constructor).toHaveBeenCalledWith(10, 'out');
//     expect(mockedGpio.prototype.writeSync).toHaveBeenCalledWith(0);
//   });

//   it('should return the properties', async () => {
//     const properties = service.properties;

//     const gpioNumberProperty = properties.find(
//       (prop) => prop.id === 'gpioNumber',
//     );

//     expect(gpioNumberProperty).toBeDefined();
//     expect(gpioNumberProperty.type).toBe('select-box');
//     expect(gpioNumberProperty.required).toBeTruthy();

//     const values = await (
//       gpioNumberProperty as SelectBoxProperty<number>
//     ).values({});

//     const gpioNumberList = await generateArray(28);

//     for (const value of values) {
//       expect(gpioNumberList.indexOf(value)).toBeGreaterThan(-1);
//     }
//   });

//   describe('getCurrentState', () => {
//     it('should fetch the on state', async () => {
//       mockedGpio.prototype.readSync.mockReturnValue(1);

//       const { state } = await service.getCurrentState({
//         device: {},
//         actor: {
//           gpio: 10,
//         },
//       });

//       expect(state).toBe('on');
//       expect(mockedGpio.prototype.constructor).toHaveBeenCalledWith(10, 'out');
//       expect(mockedGpio.prototype.readSync).toHaveBeenCalled();
//     });

//     it('should fetch the off state', async () => {
//       mockedGpio.prototype.readSync.mockReturnValue(0);

//       const { state } = await service.getCurrentState({
//         device: {},
//         actor: {
//           gpio: 10,
//         },
//       });

//       expect(state).toBe('off');
//       expect(mockedGpio.prototype.constructor).toHaveBeenCalledWith(10, 'out');
//       expect(mockedGpio.prototype.readSync).toHaveBeenCalled();
//     });
//   });

//   describe('isAvailable', () => {
//     it('should return true if the gpio is accessible', async () => {
//       mockedGpio.accessible = true;

//       const isAvailable = await service.isAvailable();
//       expect(isAvailable).toBeTruthy();
//     });

//     it('should return true if the gpio is accessible', async () => {
//       mockedGpio.accessible = false;

//       const isAvailable = await service.isAvailable();
//       expect(isAvailable).toBeFalsy();
//     });
//   });
// });

// async function generateArray(total: number): Promise<number[]> {
//   var arr: number[] = [];
//   for (var i = 1; i <= total; i++) {
//     arr.push(i);
//   }

//   return arr;
// }
