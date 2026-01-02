import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rehearsal_rooms')
export class RehearsalRoomModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column('jsonb')
  coordinates: { lat: number; lng: number };
}
