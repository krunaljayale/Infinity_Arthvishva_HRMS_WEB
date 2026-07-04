import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, FormSelect } from '@/components/elements/FormFields';

export default function Step4HealthInfo() {
    const { watch, setValue, clearErrors } = useFormContext();
    const hasDisease = watch("hasDisease");

    // Clear and strip validation errors if user updates options switch to 'No'
    useEffect(() => {
        if (hasDisease === "No") {
            const fieldsToReset = [
                "diseaseName",
                "diseaseType",
                "diseaseSince",
                "medicinesRequired",
                "doctorName",
                "doctorContact"
            ];

            fieldsToReset.forEach(field => {
                setValue(field, "", { shouldValidate: true });
            });

            clearErrors(fieldsToReset);
        }
    }, [hasDisease, setValue, clearErrors]);

    return (
        <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
                Medical & Health Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                    name="hasDisease"
                    label="Has any pre-existing disease?*"
                    options={[
                        { label: "No", value: "No" },
                        { label: "Yes", value: "Yes" }
                    ]}
                />

                {hasDisease === "Yes" && (
                    <FormInput
                        name="diseaseName"
                        label="Disease Name*"
                        placeholder="e.g. Hypertension, Diabetes"
                    />
                )}
            </div>

            {hasDisease === "Yes" && (
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormInput
                            name="diseaseType"
                            label="Disease Type / Category*"
                            placeholder="e.g. Chronic, Acute"
                        />
                        <FormInput
                            name="diseaseSince"
                            label="Disease Since (Year/Months)*"
                            placeholder="e.g. Jan 2024 or 2 Years"
                        />
                        <FormInput
                            name="medicinesRequired"
                            label="Daily Medicines Required*"
                            placeholder="e.g. Metformin 500mg, None"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50 dark:border-gray-800/50">
                        <FormInput
                            name="doctorName"
                            label="Consulting Doctor Name*"
                            placeholder="Dr. John Smith"
                        />
                        <FormInput
                            name="doctorContact"
                            label="Doctor Contact Number*"
                            placeholder="9876543210"
                            type="number"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}