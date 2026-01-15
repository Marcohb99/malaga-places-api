
export class RehearsalRoomDto {
    constructor(
        public id: string,
        public name: string,
        public city: string,
        public coordinates: {lat: number, lng: number},
    ) {}
}
  