import { CreateRehearsalRoom } from 'src/Application/UseCases/CreateRehearsalRoom';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';
import { RehearsalRoomRepository } from 'src/Domain/Repositories/RehearsalRoomRepository';
import { RehearsalRoomDto } from 'src/Infrastructure/DTO/RehearsalRoomDTO';

describe('CreateRehearsalRoom', () => {
  const makeRepo = (): jest.Mocked<RehearsalRoomRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn(),
  });

  it('maps DTO -> domain model and calls repository.save', async () => {
    const repo = makeRepo();
    const sut = new CreateRehearsalRoom(repo);

    const dto = new RehearsalRoomDto('id-1', 'Room A', 'Malaga', {
      lat: 36.7213,
      lng: -4.4214,
    });

    await sut.execute(dto);

    expect(repo.save).toHaveBeenCalledTimes(1);

    const saved = repo.save.mock.calls[0][0];
    expect(saved).toBeInstanceOf(RehearsalRoom);
    expect(saved.id).toBe('id-1');
    expect(saved.name).toBe('Room A');
    expect(saved.city).toBe('Malaga');

    expect(saved.coordinates).toBeInstanceOf(Coordinate);
    expect(saved.coordinates.latitude).toBe(36.7213);
    expect(saved.coordinates.longitude).toBe(-4.4214);
  });
});
