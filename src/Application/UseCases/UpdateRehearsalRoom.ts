import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';
import { RehearsalRoomRepository } from 'src/Domain/Repositories/RehearsalRoomRepository';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';
import { RehearsalRoomDto } from 'src/Infrastructure/DTO/RehearsalRoomDTO';

@Injectable()
export class UpdateRehearsalRoom {
  constructor(
    @Inject(RehearsalRoomRepository)
    private readonly rehearsalRoomRepository: RehearsalRoomRepository,
  ) {}

  async execute(id: string, rehearsalRoomDto: RehearsalRoomDto): Promise<void> {
    const existingRehearsalRoom =
      await this.rehearsalRoomRepository.findById(id);

    if (!existingRehearsalRoom) {
      throw new NotFoundException(
        `Rehearsal room with id ${rehearsalRoomDto.id} not found`,
      );
    }

    const updatedRehearsalRoom = new RehearsalRoom(
      id,
      rehearsalRoomDto.name,
      rehearsalRoomDto.city,
      new Coordinate(
        rehearsalRoomDto.coordinates.lat,
        rehearsalRoomDto.coordinates.lng,
      ),
    );

    return this.rehearsalRoomRepository.save(updatedRehearsalRoom);
  }
}
