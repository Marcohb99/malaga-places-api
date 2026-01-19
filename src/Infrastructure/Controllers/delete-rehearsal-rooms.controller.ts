import { Controller, Param, Delete } from '@nestjs/common';
import { DeleteRehearsalRoom } from 'src/Application/UseCases/DeleteRehearsalRoom';

@Controller()
export class DeleteRehearsalRoomController {
  constructor(private readonly deleteRehearsalRoom: DeleteRehearsalRoom) {}

  @Delete('/rehearsalRoom/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteRehearsalRoom.execute(id);
  }
}
