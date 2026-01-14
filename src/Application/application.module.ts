// src/Application/application.module.ts
import { Module } from '@nestjs/common';
import { GetRehearsalRoomsUseCase } from './UseCases/GetRehearsalRooms';

@Module({
  imports: [], // No Infrastructure imports - only Domain interfaces
  providers: [GetRehearsalRoomsUseCase],
  exports: [GetRehearsalRoomsUseCase],
})
export class ApplicationModule {}