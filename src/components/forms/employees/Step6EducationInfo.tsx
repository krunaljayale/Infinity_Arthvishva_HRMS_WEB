"use client";

import React from 'react';
import { useFormContext, get } from 'react-hook-form';
import { FormInput } from '@/components/elements/FormFields';

export default function Step6EducationInfo() {
    const { setValue, formState: { errors } } = useFormContext();

    // Explicitly track the active error payload state for the mandatory high school input field
    const hscError = get(errors, "hscPercent")?.message as string;

    // Helper method to attach local file configurations cleanly to the hook form path
    const handleFileChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, file.name, { shouldValidate: true });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Education Details
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                    Provide precise academic history metrics and upload corresponding verifiable marksheets.
                </p>
            </div>

            {/* Section 1: Secondary & Higher Secondary Education Metrics */}
            <div className={`bg-gray-50/50 dark:bg-gray-900/20 border ${hscError ? 'border-red-500/30 bg-red-50/5 dark:bg-red-950/5' : 'border-gray-100 dark:border-gray-800'} p-5 rounded-2xl space-y-6 transition-all`}>
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Schooling Qualifications
                    </h4>
                    {hscError && (
                        <span className="text-xs text-red-500 font-medium animate-fade-in">{hscError}</span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                        name="hscPercent"
                        label="HSC / 12th Percentage*"
                        placeholder="e.g. 85.50"
                        type="number"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* 10th Marksheet Document Upload */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Upload 10th Marksheet
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange("tenthMarksheetUrl", e)}
                            className="w-full text-sm text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all cursor-pointer"
                        />
                    </div>

                    {/* 12th Marksheet Document Upload */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Upload 12th Marksheet
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange("twelfthMarksheetUrl", e)}
                            className="w-full text-sm text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Section 2: Higher Education Tier (Graduation & Post Graduation) */}
            <div className="bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl space-y-6">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2">
                    Higher Education Records (Optional)
                </h4>

                {/* Graduation Block */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <FormInput
                        name="graduationCourse"
                        label="Graduation Course"
                        placeholder="e.g. B.Tech CSE, B.Com"
                    />
                    <FormInput
                        name="graduationPercent"
                        label="Graduation Percentage"
                        placeholder="e.g. 78.20"
                        type="number"
                    />
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Graduation Marksheet</label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange("graduationMarksheetUrl", e)}
                            className="w-full text-sm text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all cursor-pointer"
                        />
                    </div>
                </div>

                {/* Post Graduation Block */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4 border-t border-gray-100 dark:border-gray-800/60">
                    <FormInput
                        name="postGraduationCourse"
                        label="Post Graduation Course"
                        placeholder="e.g. M.Tech, MBA"
                    />
                    <FormInput
                        name="postGraduationPercent"
                        label="Post Graduation Percentage"
                        placeholder="e.g. 82.00"
                        type="number"
                    />
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload PG Marksheet</label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange("postGraduationMarksheetUrl", e)}
                            className="w-full text-sm text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}