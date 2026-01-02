// src/infrastructure/repositories/rehearsal-room.typeorm.repository.ts
import { Injectable } from '@nestjs/common';
import { RehearsalRoomRepository } from '../../../Domain/Repositories/RehearsalRoomRepository';
import { RehearsalRoom } from '../../../Domain/Models/RehearsalRoom';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RehearsalRoomModel } from '../Models/RehearsalRoom.model';
import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';

@Injectable()
export class RehearsalRoomTypeOrmRepository implements RehearsalRoomRepository {
  constructor(
    @InjectRepository(RehearsalRoomModel)
    private readonly rehearsalRoomModelRepository: Repository<RehearsalRoomModel>,
  ) {}

  async findAll(): Promise<RehearsalRoom[]> {
    const models = await this.rehearsalRoomModelRepository.find();
    return models.map(
      (model) =>
        new RehearsalRoom(
          model.id,
          model.name,
          model.city,
          new Coordinate(model.coordinates.lat, model.coordinates.lng),
        ),
    );
  }

  async findById(id: string): Promise<RehearsalRoom | null> {
    const model = await this.rehearsalRoomModelRepository.findOne({ where: { id } });
    if (!model) return null;
    return new RehearsalRoom(
      model.id,
      model.name,
      model.city,
      new Coordinate(model.coordinates.lat, model.coordinates.lng),
    );
  }

  async save(rehearsalRoom: RehearsalRoom): Promise<void> {
    const model = new RehearsalRoomModel();
    model.id = rehearsalRoom.id;
    model.name = rehearsalRoom.name;
    model.city = rehearsalRoom.city;
    model.coordinates = {
      lat: rehearsalRoom.coordinates.latitude,
      lng: rehearsalRoom.coordinates.longitude,
    };
    await this.rehearsalRoomModelRepository.save(model);
  }

  async delete(rehearsalRoomId: string): Promise<void> {
    await this.rehearsalRoomModelRepository.delete(rehearsalRoomId);
  }
}
