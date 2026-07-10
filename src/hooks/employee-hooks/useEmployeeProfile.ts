"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { employeeService } from '@/services/employee.service';

export function useEmployeeProfile() {
    const { id } = useParams();
    const router = useRouter();
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [managerName, setManagerName] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await employeeService.getEmployeeById(id as string);
                setEmployee(res.data);
            } catch (error) {
                console.error("Error retrieving profile summary context:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProfile();
    }, [id]);

    useEffect(() => {
        // Only fire if managerId exists and isn't already a populated object
        const managerIdString = typeof employee?.managerId === 'object'
            ? (employee.managerId as any)?._id
            : employee?.managerId;

        if (managerIdString) {
            const fetchManagerName = async () => {
                try {
                    // Pass an array specifying exactly what you need back
                    const res = await employeeService.getEmployeeById(managerIdString, ['name']);

                    // Set the specific manager name state instead of overwriting the main employee state
                    setManagerName(res?.data?.name || res?.name || 'Unknown');
                } catch (error) {
                    console.error("Error retrieving profile summary context for manager:", error);
                }
            };

            fetchManagerName();
        }
    }, [employee?.managerId]);

    // Format dates cleanly or default to fallback character
    const formatDate = (dateString?: string | Date) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "-";
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }); // e.g., 26-Apr-1988
    };

    // Safely retrieve flat values or fallback to "-"
    const displayValue = (val: any) => {
        if (val === undefined || val === null || val === '') return "-";
        return val.toString();
    };

    const handleBack = () => router.back();
    const handleEdit = () => router.push(`/dashboard/employees/${id}/edit`);

    return {
        employee,
        loading,
        managerName,
        formatDate,
        displayValue,
        handleBack,
        handleEdit
    };
}