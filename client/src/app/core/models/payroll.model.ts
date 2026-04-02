
export interface Payroll {
    _id: string;
    employeeId: string;
    month: number;
    year: number;
    totalWorkedHours: number;
    totalOvertimeHours: number;
    totalNightHours: number;
    hourlyRate: number;
    bonuses: number;
    deductions: number;
    grossSalary: number;
    netSalary: number;
    status: 'draft' | 'approved' | 'paid';
    generatedAt?: string;
}