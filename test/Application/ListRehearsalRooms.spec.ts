import { ListRehearsalRooms } from 'src/Application/UseCases/ListRehearsalRooms';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';
import { RehearsalRoomRepository } from 'src/Domain/Repositories/RehearsalRoomRepository';

describe('ListRehearsalRooms', () => {
  const makeRepo = (): jest.Mocked<RehearsalRoomRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  it('returns the repository.findAll result', async () => {
    const repo = makeRepo();
    const rooms = [
      new RehearsalRoom('id-1', 'Room A', 'Malaga', new Coordinate(36.7, -4.4)),
      new RehearsalRoom(
        'id-2',
        'Room B',
        'Malaga',
        new Coordinate(36.71, -4.41),
      ),
    ];
    repo.findAll.mockResolvedValue(rooms);

    const useCase = new ListRehearsalRooms(repo);
    await expect(useCase.execute()).resolves.toEqual(rooms);

    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });
});
