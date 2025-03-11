'use client';

import React, { useState } from 'react';
import { apiClient } from '@/lib/api';
import { ApplicationInput } from '@/types/application';

const backgrounds = [
    'Student',
    'Professional',
    'Researcher',
    'Entrepreneur',
    'Other'
];

const interests = [
    'Artificial Intelligence',
    'Robotics',
    'Quantum Computing',
    'Machine Learning',
    'Healthcare AI',
    'Sustainability'
];

export default function JoinForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const formData = new FormData(e.currentTarget);
            const data: ApplicationInput = {
                fullName: formData.get('fullName')?.toString().trim() || '',
                email: formData.get('email')?.toString().trim() || '',
                background: formData.get('background')?.toString() || '',
                areaOfInterest: formData.get('areaOfInterest')?.toString() || '',
                motivation: formData.get('motivation')?.toString().trim() || ''
            };

            // Validate all fields are present
            if (!data.fullName || !data.email || !data.background || !data.areaOfInterest || !data.motivation) {
                setErrorMessage('Please fill in all fields');
                setSubmitStatus('error');
                return;
            }

            // Validate motivation length
            if (data.motivation.length < 50) {
                setErrorMessage('Please provide a more detailed motivation (at least 50 characters)');
                setSubmitStatus('error');
                return;
            }

            // Send application using API client
            await apiClient.createApplication(data);
            setSubmitStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Error submitting application:', error);
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to submit application');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="fullName" className="block text-sm font-semibold leading-6 text-gray-900">
                    Full Name
                </label>
                <div className="mt-2.5">
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                    Email
                </label>
                <div className="mt-2.5">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="background" className="block text-sm font-semibold leading-6 text-gray-900">
                    Background
                </label>
                <div className="mt-2.5">
                    <select
                        name="background"
                        id="background"
                        required
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    >
                        <option value="">Select your background</option>
                        {backgrounds.map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="areaOfInterest" className="block text-sm font-semibold leading-6 text-gray-900">
                    Area of Interest
                </label>
                <div className="mt-2.5">
                    <select
                        name="areaOfInterest"
                        id="areaOfInterest"
                        required
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    >
                        <option value="">Select your primary interest</option>
                        {interests.map(interest => (
                            <option key={interest} value={interest}>{interest}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="motivation" className="block text-sm font-semibold leading-6 text-gray-900">
                    Why do you want to join? (minimum 50 characters)
                </label>
                <div className="mt-2.5">
                    <textarea
                        name="motivation"
                        id="motivation"
                        rows={4}
                        required
                        minLength={50}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            {submitStatus === 'success' && (
                <div className="rounded-md bg-green-50 p-4">
                    <p className="text-sm text-green-800">
                        Your application has been submitted successfully! We'll be in touch soon.
                    </p>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-800">
                        {errorMessage || 'There was an error submitting your application. Please try again.'}
                    </p>
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isSubmitting ? 'Submitting...' : 'Send Application'}
            </button>
        </form>
    );
} 