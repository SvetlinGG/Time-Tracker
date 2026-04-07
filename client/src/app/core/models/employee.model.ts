
export type ContractType = 'hourly' | 'monthly' | 'shift';

export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    personalNumber: string;
    departmentId: string;
    hourlyRate: number;
    contractType: ContractType;
    standardDailyHours: number;
    isActive: boolean;
    hireDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateEmployeeDto {
    firstName: string;
    lastName: string;
    personalNumber: string;
    position: string;
    department?: string;
    hourlyRate: number;
    contractType: ContractType;
    standardDailyHours: number;
    isActive: boolean;
    hireDate: string;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto>{}