import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, FormSelect } from '@/components/elements/FormFields';

export default function Step3ExperienceInfo() {
  const { watch, setValue, clearErrors } = useFormContext();
  const experienceType = watch("experienceType");

  // Clear fields and remove validation blocks instantly if swapped back to Fresher
  useEffect(() => {
    if (experienceType === "Fresher") {
      setValue("totalExperienceYears", "", { shouldValidate: true });
      setValue("lastCompanyName", "", { shouldValidate: true });
      setValue("experienceCertificateUrl", "", { shouldValidate: true });
      clearErrors(["totalExperienceYears", "lastCompanyName"]);
    }
  }, [experienceType, setValue, clearErrors]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          name="experienceType"
          label="Experience Type*"
          options={[
            { label: "Fresher", value: "Fresher" },
            { label: "Experienced", value: "Experienced" }
          ]}
        />

        {experienceType === "Experienced" && (
          <FormInput
            name="totalExperienceYears"
            label="Total Experience (Years)*"
            placeholder="e.g. 3"
            type="number"
          />
        )}
      </div>

      {experienceType === "Experienced" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <FormInput
            name="lastCompanyName"
            label="Last Company Name*"
            placeholder="Enter company name"
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Experience Certificate
              <span className="text-xs font-normal text-gray-700 dark:text-gray-300 ml-2">(Allowed formats: .pdf, .jpg, .jpeg, .png)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full text-sm text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 transition-all"
              onChange={(e) => {
                // Logic to process file selection and populate experienceCertificateUrl can be attached here
                const file = e.target.files?.[0];
                if (file) setValue("experienceCertificateUrl", file.name, { shouldValidate: true });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}