export class CareerDTO {
  id: number;
  name: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  inOffice: boolean;
  contents?: string;
  techs: string[];

  constructor(id: number, name: string, position: string, startDate: Date) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.startDate = startDate;
    this.inOffice = false;
    this.techs = [];
  }
}
