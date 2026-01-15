import { Body, Controller, Post } from '@nestjs/common';
import { CreateRehearsalRoom } from 'src/Application/UseCases/CreateRehearsalRoom';
import { RehearsalRoomDto } from '../DTO/RehearsalRoomDTO';

@Controller()
export class CreateRehearsalRoomController {
  constructor(private readonly createRehearsalRoom: CreateRehearsalRoom) {}

  @Post('/rehearsalRoom')
  async create(@Body() rehearsalRoomDto: RehearsalRoomDto): Promise<void> {
    await this.createRehearsalRoom.execute(rehearsalRoomDto);
  }
}
