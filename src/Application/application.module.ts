// src/Application/application.module.ts
import { Module } from '@nestjs/common';
import { ListRehearsalRooms } from './UseCases/ListRehearsalRooms';
import { CreateRehearsalRoom } from './UseCases/CreateRehearsalRoom';
import { UpdateRehearsalRoom } from './UseCases/UpdateRehearsalRoom';

@Module({
  imports: [], // No Infrastructure imports - only Domain interfaces
  providers: [ListRehearsalRooms, CreateRehearsalRoom, UpdateRehearsalRoom],
  exports: [ListRehearsalRooms, CreateRehearsalRoom, UpdateRehearsalRoom],
})
export class ApplicationModule {}
