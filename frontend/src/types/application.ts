export interface Application {
    id: string;
    fullName: string;
    email: string;
    background: string;
    areaOfInterest: string;
    motivation: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

export interface ApplicationInput {
    fullName?: string;
    email?: string;
    background?: string;
    areaOfInterest?: string;
    motivation?: string;
    status?: 'pending' | 'approved' | 'rejected';
} 