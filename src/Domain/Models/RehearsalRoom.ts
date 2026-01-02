// src/domain/Models/RehearsalRoom.ts
import { Coordinate } from "../ValueObjects/Coordinates";

export class RehearsalRoom {
  constructor(
    public id: string,
    public name: string,
    public city: string,
    public coordinates: Coordinate,
  ) {}
}
