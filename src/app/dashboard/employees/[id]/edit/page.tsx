"use client";

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { EmployeeFormData } from '@/app/schemas/employee.schema';
import EmployeeFormWizard from '@/components/forms/employees/EmployeeFormWizard';
// import { employeeService } from '@/services/employee.service';

export default function EditEmployeePage({ params }: { params: { id: string } }) {
    const [initialData, setInitialData] = useState<EmployeeFormData | null>(null);

    useEffect(() => {
        // Fetch existing employee data
        const fetchEmployee = async () => {
            // const data = await employeeService.getEmployeeById(params.id);
            // setInitialData(data);
        };
        fetchEmployee();
    }, [params.id]);

    if (!initialData) return <Loader2 className="animate-spin mx-auto mt-20" />;

    const handleUpdate = async (data: EmployeeFormData) => {
        try {
            // await employeeService.updateEmployee(params.id, data);
            console.log("Updating employee:", data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Edit Employee Profile</h1>
            <EmployeeFormWizard initialData={initialData} onSubmit={handleUpdate} />
        </div>
    );
}