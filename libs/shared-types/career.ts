export interface Career {
  id: number;
  name: string;
  position: string;
  startDate: string;
  endDate?: string | null;
  contents: string;
  inOffice?: boolean;
  techs: string[];
}
