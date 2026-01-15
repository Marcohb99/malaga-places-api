import { Inject, Injectable } from '@nestjs/common';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';
import { RehearsalRoomRepository } from 'src/Domain/Repositories/RehearsalRoomRepository';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';
import { RehearsalRoomDto } from 'src/Infrastructure/DTO/RehearsalRoomDTO';

@Injectable()
export class CreateRehearsalRoom {
  constructor(
    @Inject(RehearsalRoomRepository) private readonly rehearsalRoomRepository: RehearsalRoomRepository
  ) {}

  async execute(rehearsalRoomDto: RehearsalRoomDto) {
    const rehearsalRoom = new RehearsalRoom(
      rehearsalRoomDto.id,
      rehearsalRoomDto.name,
      rehearsalRoomDto.city,
      new Coordinate(rehearsalRoomDto.coordinates.lat, rehearsalRoomDto.coordinates.lng),
    );
    return this.rehearsalRoomRepository.save(rehearsalRoom);
  }
}
