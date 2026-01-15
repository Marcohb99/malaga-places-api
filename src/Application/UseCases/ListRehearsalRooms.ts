import { Inject, Injectable } from '@nestjs/common';
import { RehearsalRoomRepository } from 'src/Domain/Repositories/RehearsalRoomRepository';

@Injectable()
export class ListRehearsalRooms {
  constructor(
    @Inject(RehearsalRoomRepository) private readonly rehearsalRoomRepository: RehearsalRoomRepository
  ) {}

  async execute() {
    return this.rehearsalRoomRepository.findAll();
  }
}
