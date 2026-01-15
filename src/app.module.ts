import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RehearsalRoomRepository } from './Domain/Repositories/RehearsalRoomRepository';
import { RehearsalRoomTypeOrmRepository } from './Infrastructure/Persistence/Repositories/RehearsalRoomTypeOrmRepository';
import { RehearsalRoomModel } from './Infrastructure/Persistence/Models/RehearsalRoom.model';
import { ListRehearsalRoomsController } from './Infrastructure/Controllers/list-rehearsal-rooms.controller';
import { ListRehearsalRooms } from './Application/UseCases/ListRehearsalRooms';
import { CreateRehearsalRoom } from './Application/UseCases/CreateRehearsalRoom';
import { CreateRehearsalRoomController } from './Infrastructure/Controllers/create-rehearsal-rooms.controller';
import { UpdateRehearsalRoom } from './Application/UseCases/UpdateRehearsalRoom';
import { UpdateRehearsalRoomController } from './Infrastructure/Controllers/update-rehearsal-rooms.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.model{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RehearsalRoomModel]),
  ],
  providers: [
    ListRehearsalRooms,
    CreateRehearsalRoom,
    UpdateRehearsalRoom,
    {
      provide: RehearsalRoomRepository, // Used as a symbol
      useClass: RehearsalRoomTypeOrmRepository,
    },
  ],
  controllers: [
    ListRehearsalRoomsController,
    CreateRehearsalRoomController,
    UpdateRehearsalRoomController,
  ],
})
export class AppModule {}
