"use client";

import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GradientButton from '@/components/buttons/GradientButton';
import {
    step1Schema,
    step2Schema,
    step3Schema,
    step4Schema,
    step5Schema,
    step6Schema,
    step7Schema,
    step8Schema,
    step9Schema,
    completeEmployeeSchema,
    transformWizardToBackendPayload
} from '@/app/schemas/employee.schema';

// Component Step Imports
import Step1BasicInfo from './Step1BasicInfo';
import Step2PersonalInfo from './Step2PersonalInfo';
import Step3ExperienceInfo from './Step3ExperienceInfo';
import Step4HealthInfo from './Step4HealthInfo';
import Step5JobDetails from './Step5JobDetails';
import { FormInput } from '@/components/elements/FormFields';
import Step6EducationInfo from './Step6EducationInfo';
import Step7IdentityProof from './Step7IdentityProof';
import Step8BankDetails from './Step8BankDetails';
import Step9EmergencyContact from './Step9EmergencyContact';
import { logToTerminal } from '@/utils/terminalLogger';

interface Props {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    isLoading?: boolean;
}

// 9-Step Configuration Layout Matrix matching the structural requirements
const STEPS = [
    { id: 1, title: 'Basic Details', schema: step1Schema },
    { id: 2, title: 'Personal Details', schema: step2Schema },
    { id: 3, title: 'Experience Details', schema: step3Schema },
    { id: 4, title: 'Health Information', schema: step4Schema },
    { id: 5, title: 'Job Details', schema: step5Schema },
    { id: 6, title: 'Education Details', schema: step6Schema },
    { id: 7, title: 'Identity Proofs', schema: step7Schema },
    { id: 8, title: 'Bank Details', schema: step8Schema },
    { id: 9, title: 'Emergency Contact', schema: step9Schema }
];

export default function EmployeeFormWizard({ initialData, onSubmit, isLoading }: Props) {
    const [currentStep, setCurrentStep] = useState(0);

    // ── THE FIX: Pass the master schema here to prevent data drops across step variations ──
    const methods = useForm<any>({
        resolver: zodResolver(completeEmployeeSchema),
        mode: 'onChange',
        shouldUnregister: false,
        defaultValues: initialData || {
            // Step 1
            name: 'Krunal', email: 'krunal@example.com', mobileNumber: '9284454408', alternateMobileNumber: '', password: 'password', confirmPassword: 'password',
            // Step 2
            gender: 'Male', bloodGroup: 'O+', dob: '', maritalStatus: 'Single', profileImageUrl: '', fatherName: '', motherName: '',
            address: {
                current: { address: '', pinCode: '', state: '', district: '', city: '' },
                permanent: { address: '', pinCode: '', state: '', district: '', city: '' }
            },
            isSameAsCurrent: false,
            // Step 3
            experienceType: 'Fresher', totalExperienceYears: '', lastCompanyName: '', experienceCertificateUrl: '',
            // Step 4
            hasDisease: 'No', diseaseName: '', diseaseType: '', diseaseSince: '', medicinesRequired: '', doctorName: '', doctorContact: '', medicalDocumentUrl: '',
            // Step 5
            employeeCode: '', role: 'Employee', isAppAdmin: false, status: 'Active', deactivateReason: '', joiningDate: '', department: '', position: '', isLeadershipRole: false, salary: '', fixedAllowance: '', managerId: '',
            salaryStructure: { basicPercentage: 100, allowancePercentage: 0 },
            // Step 6
            hscPercent: '', graduationCourse: '', graduationPercent: '', postGraduationCourse: '', postGraduationPercent: '', tenthMarksheetUrl: '', twelfthMarksheetUrl: '', graduationMarksheetUrl: '', postGraduationMarksheetUrl: '',
            // Step 7
            aadhaarNumber: '', panNumber: '', aadhaarFileUrl: '', panFileUrl: '',
            // Step 8
            accountHolderName: '', bankName: '', accountNumber: '', ifsc: '', branch: '', passbookFileUrl: '',
            // Step 9
            emergencyContactName: '', emergencyContactRelationship: '', emergencyContactMobile: '', emergencyContactAddress: ''
        }
    });

    // Place this inside your EmployeeFormWizard component, right below useForm
    const { trigger, handleSubmit, formState: { errors } } = methods;

    React.useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log("Active Wizard Validation Errors:", errors);
        }
    }, [errors]);

    // const { trigger, handleSubmit } = methods;

    // Define field groups for each step to validate them cleanly on "Next"
    const getStepFields = (stepIndex: number): any[] => {
        switch (stepIndex) {
            case 0: return ['name', 'email', 'mobileNumber', 'alternateMobileNumber', 'password', 'confirmPassword'];
            case 1: return ['gender', 'bloodGroup', 'dob', 'maritalStatus', 'profileImageUrl', 'fatherName', 'motherName', 'address', 'isSameAsCurrent'];
            case 2: return ['experienceType', 'totalExperienceYears', 'lastCompanyName', 'experienceCertificateUrl'];
            case 3: return ['hasDisease', 'diseaseName', 'diseaseType', 'diseaseSince', 'medicinesRequired', 'doctorName', 'doctorContact', 'medicalDocumentUrl'];
            case 4: return ['employeeCode', 'role', 'isAppAdmin', 'status', 'deactivateReason', 'joiningDate', 'department', 'position', 'isLeadershipRole', 'salary', 'fixedAllowance', 'managerId'];
            case 5: return ['hscPercent', 'graduationCourse', 'graduationPercent', 'postGraduationCourse', 'postGraduationPercent', 'tenthMarksheetUrl', 'twelfthMarksheetUrl', 'graduationMarksheetUrl', 'postGraduationMarksheetUrl'];
            case 6: return ['aadhaarNumber', 'panNumber', 'aadhaarFileUrl', 'panFileUrl'];
            case 7: return ['accountHolderName', 'bankName', 'accountNumber', 'ifsc', 'branch', 'passbookFileUrl'];
            case 8: return ['emergencyContactName', 'emergencyContactRelationship', 'emergencyContactMobile', 'emergencyContactAddress'];
            default: return [];
        }
    };

    const onFormSubmit: SubmitHandler<any> = async (data) => {
        await logToTerminal("Form Submission Triggered");
        await logToTerminal("Form Submission Payload", data);

        const result = completeEmployeeSchema.safeParse(data);
        if (!result.success) {
            await logToTerminal("Master validation composition failed checks", result.error.format());
            return;
        }

        const cleanBackendPayload = transformWizardToBackendPayload(data);
        await onSubmit(cleanBackendPayload);
    };

    const handleNext = async () => {
        // Enforce strict local validation targeting ONLY the fields visible in the current step
        const fieldsToValidate = getStepFields(currentStep);
        const isStepValid = await trigger(fieldsToValidate);

        if (isStepValid) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => setCurrentStep(prev => prev - 1);

    return (
        <FormProvider {...methods}>
            <div className="w-full mx-auto bg-white dark:bg-primary p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">

                {/* Steps Navigation Carousel Indicator */}
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100 dark:border-gray-800 overflow-x-auto gap-4 scrollbar-thin">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className={`flex items-center gap-2 whitespace-nowrap ${index <= currentStep ? 'text-brand-blue' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${index <= currentStep ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                {step.id}
                            </div>
                            <span className="text-xs font-semibold hidden lg:block">{step.title}</span>
                        </div>
                    ))}
                </div>

                {/* Sub-form Render Pipeline execution blocks */}
                {/* <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    {currentStep === 0 && <Step1BasicInfo />}
                    {currentStep === 1 && <Step2PersonalInfo />}
                    {currentStep === 2 && <Step3ExperienceInfo />}
                    {currentStep === 3 && <Step4HealthInfo />}
                    {currentStep === 4 && <Step5JobDetails isEditMode={!!initialData} />}
                    {currentStep === 5 && <Step6EducationInfo />}
                    {currentStep === 6 && <Step7IdentityProof />}
                    {currentStep === 7 && <Step8BankDetails />}
                    {currentStep === 8 && <Step9EmergencyContact />}

                    <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-all text-sm font-medium"
                        >
                            Back
                        </button>

                        {currentStep < STEPS.length - 1 ? (
                            <GradientButton type="button" onClick={handleNext} disabled={isLoading}>
                                Next Step
                            </GradientButton>
                        ) : (
                            <GradientButton type="submit" disabled={isLoading}>
                                {isLoading ? 'Saving...' : (initialData ? 'Update Employee' : 'Create Employee')}
                            </GradientButton>
                        )}
                    </div>
                </form> */}

                {/* Sub-form Render Pipeline execution blocks using visual display toggles */}
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    <div className={currentStep === 0 ? "block" : "hidden"}><Step1BasicInfo /></div>
                    <div className={currentStep === 1 ? "block" : "hidden"}><Step2PersonalInfo /></div>
                    <div className={currentStep === 2 ? "block" : "hidden"}><Step3ExperienceInfo /></div>
                    <div className={currentStep === 3 ? "block" : "hidden"}><Step4HealthInfo /></div>
                    <div className={currentStep === 4 ? "block" : "hidden"}><Step5JobDetails isEditMode={!!initialData} /></div>
                    <div className={currentStep === 5 ? "block" : "hidden"}><Step6EducationInfo /></div>
                    <div className={currentStep === 6 ? "block" : "hidden"}><Step7IdentityProof /></div>
                    <div className={currentStep === 7 ? "block" : "hidden"}><Step8BankDetails /></div>
                    <div className={currentStep === 8 ? "block" : "hidden"}><Step9EmergencyContact /></div>

                    {/* Navigation Actions Footer Area */}
                    <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-all text-sm font-medium"
                        >
                            Back
                        </button>

                        {currentStep < STEPS.length - 1 ? (
                            <GradientButton type="button" onClick={handleNext} disabled={isLoading}>
                                Next Step
                            </GradientButton>
                        ) : (
                            <GradientButton type="submit" disabled={isLoading}>
                                {isLoading ? 'Saving...' : (initialData ? 'Update Employee' : 'Create Employee')}
                            </GradientButton>
                        )}
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}