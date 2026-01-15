import { Test, TestingModule } from '@nestjs/testing';
import { ListRehearsalRoomsController } from 'src/Infrastructure/Controllers/list-rehearsal-rooms.controller';
import { ListRehearsalRooms } from 'src/Application/UseCases/ListRehearsalRooms';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';

describe('ListRehearsalRoomsController', () => {
  let controller: ListRehearsalRoomsController;
  let mockListRehearsalRooms: jest.Mocked<ListRehearsalRooms>;

  beforeEach(async () => {
    // Mock the use case
    mockListRehearsalRooms = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ListRehearsalRooms>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListRehearsalRoomsController],
      providers: [
        {
          provide: ListRehearsalRooms,
          useValue: mockListRehearsalRooms,
        },
      ],
    }).compile();

    controller = module.get<ListRehearsalRoomsController>(
      ListRehearsalRoomsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of rehearsal rooms', async () => {
    // Arrange
    const mockRooms: RehearsalRoom[] = [
      new RehearsalRoom('1', 'Room A', 'Málaga', new Coordinate(-1, 1)),
      new RehearsalRoom('2', 'Room B', 'Barcelona', new Coordinate(2, 2)),
    ];
    mockListRehearsalRooms.execute.mockResolvedValue(mockRooms);

    // Act
    const result = await controller.getAll();

    // Assert
    expect(mockListRehearsalRooms.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockRooms);
  });
});
