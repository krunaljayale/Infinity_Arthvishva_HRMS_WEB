"use client";

import { dashboardService } from "@/services/dashboard.service";
import { useState, useEffect } from "react";

export interface BackendBirthdayDoc {
    _id: string;
    name: string;
    department?: string;
    profileImageUrl?: string;
    dateOfBirth: string; // From backend
}

export interface UpcomingBirthdaysResponse {
    today: BackendBirthdayDoc[];
    tomorrow: BackendBirthdayDoc[];
    upcoming: BackendBirthdayDoc[];
}

// 1. Interface for Birthdays (Matches your UI)
export interface Birthday {
    id: string;
    name: string;
    role: string;
    date: string;
    isToday: boolean;
    avatar?: string;
}

export function useUpcomingBirthdays() {
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBirthdays = async () => {
            setLoading(true);
            try {
                // Fetch categorized data from NestJS
                const data = await dashboardService.getUpcomingBirthdays();

                // Array to hold our flattened UI data
                const formattedBirthdays: Birthday[] = [];

                // Helper function to safely format dates to "25 Jun"
                const formatUpcomingDate = (dateString: string) => {
                    const d = new Date(dateString);
                    return new Intl.DateTimeFormat('en-GB', {
                        day: 'numeric',
                        month: 'short'
                    }).format(d);
                };

                // 1. Process "Today"
                data.today.forEach((emp) => {
                    formattedBirthdays.push({
                        id: emp._id.toString(),
                        name: emp.name,
                        role: emp.department || 'Employee',
                        date: 'Today',
                        isToday: true,
                        avatar: emp.profileImageUrl || '',
                    });
                });

                // 2. Process "Tomorrow"
                data.tomorrow.forEach((emp) => {
                    formattedBirthdays.push({
                        id: emp._id.toString(),
                        name: emp.name,
                        role: emp.department || 'Employee',
                        date: 'Tomorrow',
                        isToday: false,
                        avatar: emp.profileImageUrl || '',
                    });
                });

                // 3. Process "Upcoming" (Day after tomorrow)
                data.upcoming.forEach((emp) => {
                    formattedBirthdays.push({
                        id: emp._id.toString(),
                        name: emp.name,
                        role: emp.department || 'Employee',
                        date: formatUpcomingDate(emp.dateOfBirth),
                        isToday: false,
                        avatar: emp.profileImageUrl || '',
                    });
                });

                setBirthdays(formattedBirthdays);
            } catch (error) {
                console.error("Failed to fetch birthdays:", error);
                setBirthdays([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBirthdays();
    }, []);

    return { birthdays, loading };
}