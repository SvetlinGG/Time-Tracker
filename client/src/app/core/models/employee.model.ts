
export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    personalNumber: string;
    departmentId: string;
    hourlyRate: number;
    contractType: 'hourly' | 'monthly' | 'shift';
    standardDailyHours: number;
    isActive: boolean;
    hireDate: string;
    createdAt?: string;
    updatedAt?: string;
}