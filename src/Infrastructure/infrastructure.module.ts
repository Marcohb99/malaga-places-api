// src/infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RehearsalRoomModel } from './Persistence/Models/RehearsalRoom.model';
import { RehearsalRoomTypeOrmRepository } from './Persistence/Repositories/RehearsalRoomTypeOrmRepository';
import { RehearsalRoomRepository, REHEARSAL_ROOM_REPOSITORY } from '../Domain/Repositories/RehearsalRoomRepository';

@Module({
  imports: [TypeOrmModule.forFeature([RehearsalRoomModel])],
  providers: [
    {
      provide: REHEARSAL_ROOM_REPOSITORY,
      useClass: RehearsalRoomTypeOrmRepository,
    },
  ],
  exports: [REHEARSAL_ROOM_REPOSITORY],
})
export class InfrastructureModule {}
