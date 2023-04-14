// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { Test } from '@nestjs/testing';
// import { DummyActor } from '.';

// describe('plugin/gpio', () => {
//   let service: DummyActor;

//   let emitStub: jest.Mock;

//   beforeEach(async () => {
//     emitStub = jest.fn();

//     const moduleRef = await Test.createTestingModule({
//       providers: [
//         DummyActor,
//         {
//           provide: EventEmitter2,
//           useFactory: () => ({
//             emit: emitStub,
//           }),
//         },
//       ],
//     }).compile();

//     service = moduleRef.get(DummyActor);
//   });

//   it('should turn on when requested', async () => {
//     await service.on({ device: {}, actor: {} });
//   });

//   it('should turn off when requested', async () => {
//     await service.off({ device: {}, actor: {} });
//   });

//   it('should return the state', async () => {
//     const { state } = await service.getCurrentState(undefined);
//     expect(state).toBe('on');
//   });
// });
