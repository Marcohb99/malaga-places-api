import { NotFoundException } from '@nestjs/common';
import { DeleteRehearsalRoom } from 'src/Application/UseCases/DeleteRehearsalRoom';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';
import { RehearsalRoomRepository } from 'src/Domain/Repositories/RehearsalRoomRepository';

describe('DeleteRehearsalRoom', () => {
  const makeRepo = (): jest.Mocked<RehearsalRoomRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn().mockResolvedValue(undefined),
  });

  it('throws NotFoundException when rehearsal room does not exist', async () => {
    const repo = makeRepo();
    repo.findById.mockResolvedValue(null);
    const sut = new DeleteRehearsalRoom(repo);
    const id = 'id-1';

    await expect(sut.execute(id)).rejects.toThrow(NotFoundException);
    await expect(sut.execute(id)).rejects.toThrow(
      'Rehearsal room with id id-1 not found',
    );
    expect(repo.findById).toHaveBeenCalledWith(id);
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('deletes existing rehearsal room and calls repository.save', async () => {
    const repo = makeRepo();
    const id = 'id-1';
    const existingRoom = new RehearsalRoom(
      id,
      'Old Room',
      'Old City',
      new Coordinate(0, 0),
    );
    repo.findById.mockResolvedValue(existingRoom);
    const sut = new DeleteRehearsalRoom(repo);

    await sut.execute(id);

    expect(repo.findById).toHaveBeenCalledWith(id);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
