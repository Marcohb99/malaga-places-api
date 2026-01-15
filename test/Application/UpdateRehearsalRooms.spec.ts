import { NotFoundException } from '@nestjs/common';
import { UpdateRehearsalRoom } from 'src/Application/UseCases/UpdateRehearsalRoom';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';
import { RehearsalRoomRepository } from 'src/Domain/Repositories/RehearsalRoomRepository';
import { RehearsalRoomDto } from 'src/Infrastructure/DTO/RehearsalRoomDTO';

describe('UpdateRehearsalRoom', () => {
  const makeRepo = (): jest.Mocked<RehearsalRoomRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn(),
  });

  it('throws NotFoundException when rehearsal room does not exist', async () => {
    const repo = makeRepo();
    repo.findById.mockResolvedValue(null);
    const sut = new UpdateRehearsalRoom(repo);
    const id = 'id-1';
    const dto = new RehearsalRoomDto(id, 'Room A', 'Malaga', {
      lat: 36.7213,
      lng: -4.4214,
    });

    await expect(sut.execute(id, dto)).rejects.toThrow(NotFoundException);
    await expect(sut.execute(id, dto)).rejects.toThrow(
      'Rehearsal room with id id-1 not found',
    );
    expect(repo.findById).toHaveBeenCalledWith(id);
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('updates existing rehearsal room and calls repository.save', async () => {
    const repo = makeRepo();
    const id = 'id-1';
    const existingRoom = new RehearsalRoom(
      id,
      'Old Room',
      'Old City',
      new Coordinate(0, 0),
    );
    repo.findById.mockResolvedValue(existingRoom);
    const sut = new UpdateRehearsalRoom(repo);

    const dto = new RehearsalRoomDto(id, 'Updated Room', 'Malaga', {
      lat: 36.7213,
      lng: -4.4214,
    });

    await sut.execute(id, dto);

    expect(repo.findById).toHaveBeenCalledWith(id);
    expect(repo.save).toHaveBeenCalledTimes(1);

    const saved = repo.save.mock.calls[0][0];
    expect(saved).toBeInstanceOf(RehearsalRoom);
    expect(saved.id).toBe(id);
    expect(saved.name).toBe('Updated Room');
    expect(saved.city).toBe('Malaga');

    expect(saved.coordinates).toBeInstanceOf(Coordinate);
    expect(saved.coordinates.latitude).toBe(36.7213);
    expect(saved.coordinates.longitude).toBe(-4.4214);
  });
});
