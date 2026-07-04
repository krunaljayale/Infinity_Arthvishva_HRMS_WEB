import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/elements/FormFields';

export default function Step1BasicInfo() {
    const { watch, trigger } = useFormContext();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    // Force real-time trigger of cross-field comparison rules when either input changes value
    useEffect(() => {
        if (confirmPassword) {
            trigger("confirmPassword");
        }
    }, [password, confirmPassword, trigger]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput name="name" label="Full Name*" placeholder="John Doe" isAutoFocus />
            <FormInput name="email" label="Email Address*" placeholder="john@company.com" type="email" />
            <FormInput name="mobileNumber" label="Mobile Number*" placeholder="9876543210" type="number" />
            <FormInput name="alternateMobileNumber" label="Alternate Mobile Number" placeholder="9876543210" type="number" />

            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="password" label="Password*" type="password" placeholder="••••••••" />
                <FormInput name="confirmPassword" label="Confirm Password*" type="password" placeholder="••••••••" />
            </div>
        </div>
    );
}