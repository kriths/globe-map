export interface Country {
  name: string;
  alpha2: string;
  alpha3: string;
  lat: number;
  lon: number;
  alternatives?: string[];
}
