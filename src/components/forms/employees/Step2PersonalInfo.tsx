import React, { useEffect } from 'react';
import { FormInput, FormSelect } from '@/components/elements/FormFields';
import { ProfilePhotoUpload } from '@/components/elements/ProfilePhotoUpload';
import { useFormContext } from 'react-hook-form';

export default function Step2PersonalInfo() {
    const { register, watch, setValue } = useFormContext();

    const isSameAsCurrent = watch("isSameAsCurrent");

    const currentAddress = watch("address.current.address");
    const currentPinCode = watch("address.current.pinCode");
    const currentState = watch("address.current.state");
    const currentDistrict = watch("address.current.district");
    const currentCity = watch("address.current.city");

    useEffect(() => {
        if (isSameAsCurrent) {
            setValue("address.permanent.address", currentAddress, { shouldValidate: true });
            setValue("address.permanent.pinCode", currentPinCode, { shouldValidate: true });
            setValue("address.permanent.state", currentState, { shouldValidate: true });
            setValue("address.permanent.district", currentDistrict, { shouldValidate: true });
            setValue("address.permanent.city", currentCity, { shouldValidate: true });
        }
    }, [
        isSameAsCurrent,
        currentAddress,
        currentPinCode,
        currentState,
        currentDistrict,
        currentCity,
        setValue
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
                <ProfilePhotoUpload name="profilePhoto" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                    <FormSelect name="gender" label="Gender" options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                        { label: "Other", value: "Other" }
                    ]} />
                    <FormInput name="fatherName" label="Father Name" placeholder="Enter name" />
                    <FormInput name="motherName" label="Mother Name" placeholder="Enter name" />
                    <FormInput name="dob" label="DOB" type="date" />
                    <div className="md:col-span-2">
                        <FormSelect name="maritalStatus" label="Marital Status" options={[
                            { label: "Single", value: "Single" },
                            { label: "Married", value: "Married" },
                            { label: "Divorced", value: "Divorced" },
                            { label: "Widowed", value: "Widowed" }
                        ]} />
                    </div>
                </div>
            </div>

            {/* Current Address Section */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Current Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-1">
                        <FormInput name="address.current.address" label="Address" placeholder="123 Main St" />
                    </div>
                    <FormInput name="address.current.pinCode" label="Pin Code" placeholder="400001" type="number" />
                    <FormInput name="address.current.state" label="State" placeholder="State" />
                    <FormInput name="address.current.district" label="District" placeholder="District" />
                    <FormInput name="address.current.city" label="City" placeholder="City" />
                </div>
            </div>

            {/* Permanent Address Section */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-4 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        className="rounded border-gray-300 accent-brand-blue"
                        {...register("isSameAsCurrent")}
                    />
                    Permanent address same as current
                </label>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-1">
                        <FormInput
                            name="address.permanent.address"
                            label="Permanent Address"
                            placeholder="123 Main St"
                            disabled={isSameAsCurrent}
                        />
                    </div>
                    <FormInput
                        name="address.permanent.pinCode"
                        label="Pin Code"
                        placeholder="400001"
                        type="number"
                        disabled={isSameAsCurrent}
                    />
                    <FormInput
                        name="address.permanent.state"
                        label="State"
                        placeholder="State"
                        disabled={isSameAsCurrent}
                    />
                    <FormInput
                        name="address.permanent.district"
                        label="District"
                        placeholder="District"
                        disabled={isSameAsCurrent}
                    />
                    <FormInput
                        name="address.permanent.city"
                        label="City"
                        placeholder="City"
                        disabled={isSameAsCurrent}
                    />
                </div>
            </div>
        </div>
    );
}