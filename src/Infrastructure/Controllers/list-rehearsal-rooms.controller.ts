import { Controller, Get } from '@nestjs/common';
import { GetRehearsalRoomsUseCase } from 'src/Application/UseCases/GetRehearsalRooms';
import { RehearsalRoom } from 'src/Domain/Models/RehearsalRoom';

@Controller()
export class ListRehearsalRoomsController {
  constructor(private readonly getRehearsalRooms: GetRehearsalRoomsUseCase) {}

  @Get('/rehearsalRooms')
  async getAll(): Promise<RehearsalRoom[]> {
    return await this.getRehearsalRooms.execute();
  }
}
