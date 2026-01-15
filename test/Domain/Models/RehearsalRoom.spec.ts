import { RehearsalRoom } from "src/Domain/Models/RehearsalRoom";
import { Coordinate } from "src/Domain/ValueObjects/Coordinates";
import { randomUUID } from 'node:crypto';

describe('RehearsalRoomTest', () => {
    it('Should create', () => {
        const id = randomUUID();
        const sut = new RehearsalRoom(
            id,
            'test',
            'Málaga',
            new Coordinate(-1, 1)
        );
        expect(sut.id).toEqual(id);
        expect(sut.name).toEqual('test');
        expect(sut.city).toEqual('Málaga');
        expect(sut.coordinates).toEqual(new Coordinate(-1, 1));
    });
});