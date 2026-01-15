import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRehearsalRoomController } from 'src/Infrastructure/Controllers/update-rehearsal-rooms.controller';
import { UpdateRehearsalRoom } from 'src/Application/UseCases/UpdateRehearsalRoom';

describe('UpdateRehearsalRoomController', () => {
  let controller: UpdateRehearsalRoomController;
  let mockUpdateRehearsalRoom: jest.Mocked<UpdateRehearsalRoom>;

  beforeEach(async () => {
    mockUpdateRehearsalRoom = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateRehearsalRoom>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateRehearsalRoomController],
      providers: [
        {
          provide: UpdateRehearsalRoom,
          useValue: mockUpdateRehearsalRoom,
        },
      ],
    }).compile();

    controller = module.get<UpdateRehearsalRoomController>(
      UpdateRehearsalRoomController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the use case with the dto including the id from params and return void', async () => {
    const id = '1';
    const bodyDto = {
      id: id,
      name: 'Updated Room',
      city: 'Málaga',
      coordinates: {
        lat: 36.7,
        lng: -4.4,
      },
    };
    mockUpdateRehearsalRoom.execute.mockResolvedValue(undefined as any);

    await expect(controller.update(id, bodyDto)).resolves.toBeUndefined();
    expect(mockUpdateRehearsalRoom.execute).toHaveBeenCalledTimes(1);
    expect(mockUpdateRehearsalRoom.execute).toHaveBeenCalledWith(
      id,
      expect.objectContaining({
        id: id,
        name: 'Updated Room',
        city: 'Málaga',
        coordinates: {
          lat: 36.7,
          lng: -4.4,
        },
      }),
    );
  });
});
