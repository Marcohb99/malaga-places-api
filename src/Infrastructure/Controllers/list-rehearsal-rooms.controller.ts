import { Controller, Get } from '@nestjs/common';
import { ListRehearsalRooms } from 'src/Application/UseCases/ListRehearsalRooms';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';

@Controller()
export class ListRehearsalRoomsController {
  constructor(private readonly getRehearsalRooms: ListRehearsalRooms) {}

  @Get('/rehearsalRooms')
  async getAll(): Promise<RehearsalRoom[]> {
    return await this.getRehearsalRooms.execute();
  }
}
