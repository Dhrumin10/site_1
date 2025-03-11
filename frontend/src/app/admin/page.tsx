'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { Application, ApplicationInput } from '@/types/application';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }

        async function fetchApplications() {
            try {
                const response = await apiClient.getApplications();
                setApplications(response.data || []);
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError('Failed to load applications');
            } finally {
                setLoading(false);
            }
        }

        if (status === 'authenticated') {
            fetchApplications();
        }
    }, [status, router]);

    async function handleStatusChange(id: string, newStatus: Application['status']) {
        try {
            const updateData: ApplicationInput = { status: newStatus };
            const response = await apiClient.updateApplication(id, updateData);

            if (response.data) {
                setApplications(prevApps =>
                    prevApps.map(app =>
                        app.id === id ? { ...app, status: newStatus } : app
                    )
                );
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        }
    }

    if (status === 'loading' || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Applications Dashboard</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Background</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Interest</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {applications.map((application) => (
                            <tr key={application.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{application.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{application.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{application.background}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{application.areaOfInterest}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${application.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            application.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                                        {application.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {new Date(application.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={application.status}
                                        onChange={(e) => handleStatusChange(application.id, e.target.value as Application['status'])}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approve</option>
                                        <option value="rejected">Reject</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 