import { RehearsalRoom } from "src/Domain/Models/RehearsalRoom";
import { Coordinate } from "src/Domain/ValueObjects/Coordinates";
import { v4 as uuidv4 } from 'uuid';

describe('RehearsalRoomTest', () => {
    it('Should create', () => {
        const id = uuidv4();
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