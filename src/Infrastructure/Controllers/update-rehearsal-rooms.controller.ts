import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateRehearsalRoom } from 'src/Application/UseCases/UpdateRehearsalRoom';
import { RehearsalRoomDto } from '../DTO/RehearsalRoomDTO';

@Controller()
export class UpdateRehearsalRoomController {
  constructor(private readonly updateRehearsalRoom: UpdateRehearsalRoom) {}

  @Put('/rehearsalRoom/:id')
  async update(
    @Param('id') id: string,
    @Body() rehearsalRoomDto: RehearsalRoomDto,
  ): Promise<void> {
    await this.updateRehearsalRoom.execute(id, rehearsalRoomDto);
  }
}
