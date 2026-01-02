// test/unit/infrastructure/controllers/list-rehearsal-rooms.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ListRehearsalRoomsController } from 'src/Infrastructure/Controllers/list-rehearsal-rooms.controller';
import { GetRehearsalRoomsUseCase } from 'src/Application/UseCases/GetRehearsalRooms';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';

describe('ListRehearsalRoomsController', () => {
  let controller: ListRehearsalRoomsController;
  let mockGetRehearsalRoomsUseCase: jest.Mocked<GetRehearsalRoomsUseCase>;

  beforeEach(async () => {
    // Mock the use case
    mockGetRehearsalRoomsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetRehearsalRoomsUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListRehearsalRoomsController],
      providers: [
        {
          provide: GetRehearsalRoomsUseCase,
          useValue: mockGetRehearsalRoomsUseCase,
        },
      ],
    }).compile();

    controller = module.get<ListRehearsalRoomsController>(ListRehearsalRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of rehearsal rooms', async () => {
    // Arrange
    const mockRooms: RehearsalRoom[] = [
      new RehearsalRoom(
        '1',
        'Room A',
        'Málaga',
        new Coordinate(-1, 1),
      ),
      new RehearsalRoom(
        '2',
        'Room B',
        'Barcelona',
        new Coordinate(2, 2),
      ),
    ];
    mockGetRehearsalRoomsUseCase.execute.mockResolvedValue(mockRooms);

    // Act
    const result = await controller.getAll();

    // Assert
    expect(mockGetRehearsalRoomsUseCase.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockRooms);
  });
});
