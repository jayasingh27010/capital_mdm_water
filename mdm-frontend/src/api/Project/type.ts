export interface CreateProjectRequestDTO {
    projectName?: string; // The name of the project
    description?: string; // Optional description of the project
    startDate: string; // Start date of the project in ISO format (e.g., '2024-10-01')
    endDate?: string; // Optional end date of the project in ISO format
    userId: number; // ID of the user creating the project
    status: 'active' | 'inactive'; // Status of the project
    selectedDates: Date[]; // List of selected dates related to the project
}

export interface FieldObject  {
    order: number; // The 'order' field is mandatory
    name: string;
    value: string | number;
    required?: boolean; // Optional field
  };