"use client";

import React from 'react';
import { useFormContext, get } from 'react-hook-form';
import { FormInput } from '@/components/elements/FormFields';

export default function Step8BankDetails() {
    const { setValue, formState: { errors } } = useFormContext();

    // Pull file attachment errors for visual tracking markers
    const passbookError = get(errors, "passbookFileUrl")?.message as string;

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
                    Bank Account Details
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                    Configure structural payout routing pipelines and upload financial authorization clearances.
                </p>
            </div>

            {/* Row 1: Core Account Identifiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput
                    name="accountHolderName"
                    label="Account Holder Name*"
                    placeholder="e.g. John Doe"
                />
                <FormInput
                    name="bankName"
                    label="Bank Name*"
                    placeholder="e.g. HDFC Bank"
                />
                <FormInput
                    name="accountNumber"
                    label="Account Number*"
                    placeholder="e.g. 501002345678"
                    type="number"
                />
            </div>

            {/* Row 2: Clearance Routes & Document Verification Attachment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-2">
                <FormInput
                    name="ifsc"
                    label="IFSC Code*"
                    placeholder="e.g. HDFC0001234"
                    textTransform="uppercase"
                />
                <FormInput
                    name="branch"
                    label="Branch Name*"
                    placeholder="e.g. Shivajinagar Branch"
                />

                {/* Passbook / Cancelled Cheque upload box */}
                <div className="flex flex-col gap-1.5 w-full">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Upload Passbook / Cheque Copy*
                        </label>
                        {passbookError && (
                            <span className="text-xs text-red-500 font-medium">{passbookError}</span>
                        )}
                    </div>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("passbookFileUrl", e)}
                        className={`w-full text-sm text-gray-500 border ${passbookError ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all cursor-pointer`}
                    />
                </div>
            </div>
        </div>
    );
}