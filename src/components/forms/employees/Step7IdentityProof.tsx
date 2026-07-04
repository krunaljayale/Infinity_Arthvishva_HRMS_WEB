"use client";

import React from 'react';
import { useFormContext, get } from 'react-hook-form';
import { FormInput } from '@/components/elements/FormFields';

export default function Step7IdentityProof() {
    const { setValue, formState: { errors } } = useFormContext();

    // Explicitly pull file attachment errors for visual error feedback indicators
    const aadhaarFileError = get(errors, "aadhaarFileUrl")?.message as string;
    const panFileError = get(errors, "panFileUrl")?.message as string;

    // Helper hook to push dynamic local file allocations to React Hook Form context parameters
    const handleFileChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, file.name, { shouldValidate: true });
        } else {
            setValue(fieldName, "", { shouldValidate: true });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Identity Proofs
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                    Provide legal statutory government identification parameters and upload valid supporting documentation files.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ── AADHAAR CARD PROCESSING BLOCK ── */}
                <div className="p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800/60 pb-2">
                        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Aadhaar Card Verification*</label>
                    </div>

                    <FormInput
                        name="aadhaarNumber"
                        label="Aadhaar Number*"
                        placeholder="12-Digit Unique Identification Number"
                    />

                    <div className="flex flex-col gap-1.5 w-full pt-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Upload Aadhaar Copy (Front & Back PDF)*</label>
                            {aadhaarFileError && <span className="text-xs text-red-500 font-medium">{aadhaarFileError}</span>}
                        </div>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange("aadhaarFileUrl", e)}
                            className={`w-full text-sm text-gray-500 border ${aadhaarFileError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all cursor-pointer`}
                        />
                    </div>
                </div>

                {/* ── PAN CARD PROCESSING BLOCK ── */}
                <div className="p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800/60 pb-2">
                        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">PAN Card Verification*</label>
                    </div>

                    <FormInput
                        name="panNumber"
                        label="PAN Number*"
                        placeholder="ABCDE1234F"
                        textTransform="uppercase"
                    />

                    <div className="flex flex-col gap-1.5 w-full pt-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Upload PAN Card File*</label>
                            {panFileError && <span className="text-xs text-red-500 font-medium">{panFileError}</span>}
                        </div>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange("panFileUrl", e)}
                            className={`w-full text-sm text-gray-500 border ${panFileError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all cursor-pointer`}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}