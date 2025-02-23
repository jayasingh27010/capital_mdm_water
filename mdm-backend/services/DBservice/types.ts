export type DBResponse = {
    rows: any[],
    totalRecords: number
}

export type DBStatResponse = Record<string, string>

export type APIResponse = {
    data: any[],
    status: string
}

export type MeterConsumption= {
    month: string;    // e.g., "2024-01"
    dgreading: number;  // Digital Generator Reading
    month_name: string; // e.g., "January"
    ebReading: number;  // EB Reading (Electricity Board)
}

export type meterDBAResponse= {
    data: MeterConsumption[]; 
  }


  export type DBConsResponse = {
    rows: any [];
  };

