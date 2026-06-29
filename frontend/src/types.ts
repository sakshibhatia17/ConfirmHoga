export interface PnrInput {
  pnr: string;
  daysToJourney: number;
  currentWl: number;
  festivalSeason: boolean;
}

export interface PnrResult {
  pnr: string;
  probability: number;
  status: 'Safe Zone' | 'Moderate Zone' | 'High Risk Zone';
  statusColor: string;
  logic: string[];
  explanation: string;
}

export interface JugaadInput {
  source: string;
  destination: string;
}

export interface JugaadSegment {
  id: string;
  from: string;
  to: string;
  trainName: string;
  trainNumber: string;
  classType: string;
  coach: string;
  seat: string;
  status: 'Confirmed' | 'RAC' | 'WL';
  statusLabel: string;
}

export interface JugaadResult {
  trainName: string;
  trainNumber: string;
  totalDuration: string;
  successRate: number;
  segments: JugaadSegment[];
  aiStrategy: string;
  savings: string;
  warnings: string[];
}

export interface SuccessLog {
  id: string;
  user: string;
  route: string;
  time: string;
}
