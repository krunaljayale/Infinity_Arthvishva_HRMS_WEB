"use client";

import { FormInput } from '@/components/elements/FormFields';

export default function Step9EmergencyContact() {

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Emergency Contact Information
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                    Designate a primary safety backup handling point relative for emergency notification scenarios.
                </p>
            </div>

            {/* Row 1: Core Contact Identity and Relationship Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col w-full">
                    <FormInput
                        name="emergencyContactName"
                        label="Contact Name*"
                        placeholder="e.g. Jane Doe"
                    />
                    {/* Explicitly overwrite custom step-level validation layouts here if desired */}
                </div>

                <div className="flex flex-col w-full">
                    <FormInput
                        name="emergencyContactRelationship"
                        label="Relationship*"
                        placeholder="e.g. Spouse / Parent / Sibling"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <FormInput
                        name="emergencyContactMobile"
                        label="Mobile Number*"
                        placeholder="e.g. 9876543210"
                        type="number"
                    />
                </div>
            </div>

            {/* Row 2: Residential Sorting Rule Parameter */}
            <div className="pt-2">
                <FormInput
                    name="emergencyContactAddress"
                    label="Contact Address"
                    placeholder="Full residential address details (Optional)"
                />
            </div>
        </div>
    );
}