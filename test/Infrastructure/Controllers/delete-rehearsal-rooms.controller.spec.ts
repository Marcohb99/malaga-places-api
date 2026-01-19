import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRehearsalRoomController } from 'src/Infrastructure/Controllers/delete-rehearsal-rooms.controller';
import { DeleteRehearsalRoom } from 'src/Application/UseCases/DeleteRehearsalRoom';

describe('DeleteRehearsalRoomController', () => {
  let controller: DeleteRehearsalRoomController;
  let mockDeleteRehearsalRoom: jest.Mocked<DeleteRehearsalRoom>;

  beforeEach(async () => {
    mockDeleteRehearsalRoom = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<DeleteRehearsalRoom>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteRehearsalRoomController],
      providers: [
        {
          provide: DeleteRehearsalRoom,
          useValue: mockDeleteRehearsalRoom,
        },
      ],
    }).compile();

    controller = module.get<DeleteRehearsalRoomController>(
      DeleteRehearsalRoomController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the use case with the dto including the id from params and return void', async () => {
    const id = '1';
    mockDeleteRehearsalRoom.execute.mockResolvedValue(undefined as any);

    await expect(controller.delete(id)).resolves.toBeUndefined();
    expect(mockDeleteRehearsalRoom.execute).toHaveBeenCalledTimes(1);
    expect(mockDeleteRehearsalRoom.execute).toHaveBeenCalledWith(id);
  });
});
