import { Test, TestingModule } from '@nestjs/testing';
import { CreateRehearsalRoomController } from 'src/Infrastructure/Controllers/create-rehearsal-rooms.controller';
import { CreateRehearsalRoom } from 'src/Application/UseCases/CreateRehearsalRoom';
import { RehearsalRoomDto } from 'src/Infrastructure/DTO/RehearsalRoomDTO';

describe('CreateRehearsalRoomController', () => {
  let controller: CreateRehearsalRoomController;
  let mockCreateRehearsalRoom: jest.Mocked<CreateRehearsalRoom>;

  beforeEach(async () => {
    mockCreateRehearsalRoom = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateRehearsalRoom>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateRehearsalRoomController],
      providers: [
        {
          provide: CreateRehearsalRoom,
          useValue: mockCreateRehearsalRoom,
        },
      ],
    }).compile();

    controller = module.get<CreateRehearsalRoomController>(
      CreateRehearsalRoomController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the use case with the dto and return void', async () => {
    const dto = new RehearsalRoomDto('1', 'Room A', 'Málaga', {
      lat: 36.7,
      lng: -4.4,
    });
    mockCreateRehearsalRoom.execute.mockResolvedValue(undefined as any);

    await expect(controller.create(dto)).resolves.toBeUndefined();
    expect(mockCreateRehearsalRoom.execute).toHaveBeenCalledTimes(1);
    expect(mockCreateRehearsalRoom.execute).toHaveBeenCalledWith(dto);
  });
});
