// FRED API Response Types

export interface FredObservation {
  date: string;
  value: string;
}

export interface FredSeriesData {
  observations: FredObservation[];
}

export interface GdpApiResponse {
  gdp: FredSeriesData;
}

export interface ProcessedGdpData {
  labels: string[];
  gdpValues: string[];
}
