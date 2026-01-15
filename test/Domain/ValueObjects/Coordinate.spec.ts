import { Coordinate } from 'src/Domain/ValueObjects/Coordinates';

describe('Coordinate', () => {
  it('creates when latitude/longitude are in range', () => {
    const c = new Coordinate(36.7213, -4.4214);
    expect(c.latitude).toBe(36.7213);
    expect(c.longitude).toBe(-4.4214);
  });

  it('throws when latitude is out of range', () => {
    expect(() => new Coordinate(91, 0)).toThrow('Latitude must be between -90 and 90.');
    expect(() => new Coordinate(-91, 0)).toThrow('Latitude must be between -90 and 90.');
  });

  it('throws when longitude is out of range', () => {
    expect(() => new Coordinate(0, 181)).toThrow('Longitude must be between -180 and 180.');
    expect(() => new Coordinate(0, -181)).toThrow('Longitude must be between -180 and 180.');
  });

  it('distanceTo returns euclidean distance', () => {
    const a = new Coordinate(0, 0);
    const b = new Coordinate(3, 4);
    expect(a.distanceTo(b)).toBe(5);
  });
});