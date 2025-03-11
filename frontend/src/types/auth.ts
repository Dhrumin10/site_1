export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        role: string;
    };
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
} 