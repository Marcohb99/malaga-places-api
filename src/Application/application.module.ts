// src/Application/application.module.ts
import { Module } from '@nestjs/common';
import { ListRehearsalRooms } from './UseCases/ListRehearsalRooms';
import { CreateRehearsalRoom } from './UseCases/CreateRehearsalRoom';
import { UpdateRehearsalRoom } from './UseCases/UpdateRehearsalRoom';
import { DeleteRehearsalRoom } from 'src/Application/UseCases/DeleteRehearsalRoom';

@Module({
  imports: [], // No Infrastructure imports - only Domain interfaces
  providers: [
    ListRehearsalRooms,
    CreateRehearsalRoom,
    UpdateRehearsalRoom,
    DeleteRehearsalRoom,
  ],
  exports: [
    ListRehearsalRooms,
    CreateRehearsalRoom,
    UpdateRehearsalRoom,
    DeleteRehearsalRoom,
  ],
})
export class ApplicationModule {}
