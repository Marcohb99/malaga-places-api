import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RehearsalRoomRepository } from 'src/Domain/Repositories/RehearsalRoomRepository';

@Injectable()
export class DeleteRehearsalRoom {
  constructor(
    @Inject(RehearsalRoomRepository)
    private readonly rehearsalRoomRepository: RehearsalRoomRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingRehearsalRoom =
      await this.rehearsalRoomRepository.findById(id);

    if (!existingRehearsalRoom) {
      throw new NotFoundException(`Rehearsal room with id ${id} not found`);
    }

    return this.rehearsalRoomRepository.delete(id);
  }
}
