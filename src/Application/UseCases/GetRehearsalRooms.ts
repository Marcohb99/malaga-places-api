import { Injectable } from '@nestjs/common';
import type { RehearsalRoomRepository } from '../../Domain/Repositories/RehearsalRoomRepository';

@Injectable()
export class GetRehearsalRoomsUseCase {
  constructor(private readonly rehearsalRoomRepository: RehearsalRoomRepository) {}

  async execute() {
    return this.rehearsalRoomRepository.findAll();
  }
}
