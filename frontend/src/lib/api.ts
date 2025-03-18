import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Application, ApplicationInput } from '@/types/application';
import { ApiResponse, LoginResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://site-1-kkhg.onrender.com';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true // Enable sending cookies in cross-origin requests
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const endpoints = {
    auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
    },
    applications: {
        list: '/api/applications',
        create: '/api/applications',
        update: (id: string) => `/api/applications/${id}`,
        delete: (id: string) => `/api/applications/${id}`,
    },
    projects: {
        list: '/api/projects',
        create: '/api/projects',
        update: (id: string) => `/api/projects/${id}`,
        delete: (id: string) => `/api/projects/${id}`,
    },
    users: {
        profile: '/api/users/profile',
        update: '/api/users/profile',
    },
    ideas: {
        list: '/api/ideas',
        create: '/api/ideas',
        update: (id: string) => `/api/ideas/${id}`,
        delete: (id: string) => `/api/ideas/${id}`,
    },
};

// Type definitions
export interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

// API functions
export const apiClient = {
    // Auth
    async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
        return api.post(endpoints.auth.login, { email, password });
    },

    // Applications
    async getApplications(): Promise<ApiResponse<Application[]>> {
        return api.get(endpoints.applications.list);
    },

    async createApplication(data: ApplicationInput) {
        const response = await api.post<ApiResponse<Application>>(endpoints.applications.create, data);
        return response.data;
    },

    async updateApplication(id: string, data: ApplicationInput): Promise<ApiResponse<Application>> {
        return api.patch(endpoints.applications.update(id), data);
    },

    // Ideas
    async createIdea(data: IdeaInput) {
        const response = await api.post<ApiResponse<Idea>>(endpoints.ideas.create, data);
        return response.data;
    },

    // Projects
    async getProjects() {
        const response = await api.get<ApiResponse<Project[]>>(endpoints.projects.list);
        return response.data;
    },

    async createProject(data: ProjectInput) {
        const response = await api.post<ApiResponse<Project>>(endpoints.projects.create, data);
        return response.data;
    },

    // Users
    async getUserProfile(): Promise<ApiResponse<User>> {
        return api.get(endpoints.users.profile);
    },
};

// Types
export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    githubUrl?: string;
    createdAt: string;
}

export interface ProjectInput {
    title: string;
    description: string;
    category: string;
    githubUrl?: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'admin';
    avatarUrl?: string;
}

export interface Idea {
    id: string;
    title: string;
    description: string;
    category: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface IdeaInput {
    title: string;
    description: string;
    category: string;
    name: string;
    email: string;
}

export default apiClient; 
