// src/Application/application.module.ts
import { Module } from '@nestjs/common';
import { ListRehearsalRooms } from './UseCases/ListRehearsalRooms';
import { CreateRehearsalRoom } from './UseCases/CreateRehearsalRoom';

@Module({
  imports: [], // No Infrastructure imports - only Domain interfaces
  providers: [ListRehearsalRooms, CreateRehearsalRoom],
  exports: [ListRehearsalRooms, CreateRehearsalRoom],
})
export class ApplicationModule {}
