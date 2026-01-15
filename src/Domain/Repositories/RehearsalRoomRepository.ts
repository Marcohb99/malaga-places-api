import { RehearsalRoom } from '../Models/RehearsalRoom';

export const RehearsalRoomRepository = Symbol('RehearsalRoomRepository');
export interface RehearsalRoomRepository {
  findAll(): Promise<RehearsalRoom[]>;
  findById(id: string): Promise<RehearsalRoom | null>;
  save(rehearsalRoom: RehearsalRoom): Promise<void>;
  delete(rehearsalRoomId: string): Promise<void>;
}
