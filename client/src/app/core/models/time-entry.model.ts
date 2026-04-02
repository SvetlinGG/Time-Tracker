
export interface TimeEntry {
    _id: string;
    employeeId: string;
    date: string;
    startTime: string;
    endTime: string;
    breakMinutes: number;
    workedHours: number;
    overtimeHours: number;
    nightHours: number;
    isApproved: boolean;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}