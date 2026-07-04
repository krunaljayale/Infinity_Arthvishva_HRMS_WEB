"use client";

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, FormSelect } from '@/components/elements/FormFields';
import { DEPARTMENTS, POSITIONS } from '@/app/schemas/employee.schema';
import { employeeService } from '@/services/employee.service';

interface Manager {
  _id: string;
  name: string;
  position: string;
  employeeCode: string;
}

interface Step5JobDetailsProps {
  isEditMode?: boolean;
}

export default function Step5JobDetails({ isEditMode = false }: Step5JobDetailsProps) {
  const { watch, setValue, clearErrors, register, formState: { errors } } = useFormContext();
  const status = watch("status");
  const selectedManagerId = watch("managerId");

  // Watch concrete financial components in real-time
  const salary = Number(watch("salary") || 0);
  const fixedAllowance = Number(watch("fixedAllowance") || 0);
  const grossMonthlyComp = salary + fixedAllowance;

  const [managers, setManagers] = useState<Manager[]>([]);
  const [isLoadingManagers, setIsLoadingManagers] = useState(true);

  // 1. Efficiently keep the schema's grossSalary property synchronized without lifecycle loop triggers
  useEffect(() => {
    setValue("grossSalary", grossMonthlyComp, { shouldValidate: true });
  }, [grossMonthlyComp, setValue]);

  // 2. Fetch network layout metadata dependencies strictly on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchJobDetailsAndManagers() {
      try {
        setIsLoadingManagers(true);
        const [managersRes, codeRes] = await Promise.all([
          employeeService.getManagerList(),
          !isEditMode ? employeeService.getNewEmployeeCode() : Promise.resolve({ data: '' })
        ]);

        if (!isMounted) return;

        setManagers(managersRes.data);

        if (!isEditMode && codeRes?.data) {
          setValue("employeeCode", codeRes.data, { shouldValidate: true });
        }
      } catch (error) {
        console.error("Failed to load onboarding metadata dependencies", error);
      } finally {
        if (isMounted) setIsLoadingManagers(false);
      }
    }

    fetchJobDetailsAndManagers();
    return () => { isMounted = false; };
  }, [isEditMode, setValue]);

  // 3. Cleanup deactivation reason tracks if profile status flips back to Active
  useEffect(() => {
    if (status === "Active") {
      setValue("deactivateReason", "", { shouldValidate: true });
      clearErrors("deactivateReason");
    }
  }, [status, setValue, clearErrors]);

  const departmentOptions = DEPARTMENTS.map((dept) => ({ label: dept, value: dept }));
  const positionOptions = POSITIONS.map((pos) => ({ label: pos, value: pos }));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Job Details & Org Alignment
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure operational parameters, financial structures, and manager routing metrics.
        </p>
      </div>

      {/* Row 1: Read-Only System Identity Status Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee Code (Auto-Generated)</label>
          <div className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono font-bold select-none text-sm">
            {watch("employeeCode") || "Generating ID..."}
          </div>
        </div>

        <FormSelect
          name="role"
          label="Access Privilege Role*"
          options={[
            { label: "Employee", value: "Employee" },
            { label: "Intern", value: "Intern" }
          ]}
        />

        <FormSelect
          name="status"
          label="Employment Status*"
          options={[
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" }
          ]}
        />
      </div>

      {/* Row 2: Operational Sector Allocations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormSelect name="department" label="Department*" options={departmentOptions} />
        <FormSelect name="position" label="Position*" options={positionOptions} />
        <FormInput name="joiningDate" label="Joining Date*" type="date" />
      </div>

      {/* ── REFACTORED COMPLIANT EXTRACTION AND COMPENSATION BLOCK ── */}
      <div className="p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Compensation Parameters</h4>
          <p className="text-xs text-gray-400">Specify regular monthly payments alongside standard fixed allowances.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput name="salary" label="Base Salary (Monthly)*" placeholder="₹ Amount" type="number" />
          <FormInput name="fixedAllowance" label="Fixed Allowance (Monthly)*" placeholder="₹ Amount" type="number" />
        </div>

        {/* Computational baseline summary tag layout */}
        <div className="pt-3 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Estimated Gross Monthly Compensation:</span>
          <span className="font-bold text-gray-900 dark:text-white text-sm">
            ₹{grossMonthlyComp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        {/* Implicitly proxy total value track to Zod orchestrator */}
        <input type="hidden" {...register("grossSalary")} />
      </div>

      {/* Row 4: Single Reporting Manager Card Grid Selection Area */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Reporting Manager (Select One)*
          </label>
          {errors.managerId && (
            <span className="text-xs text-red-500 font-medium">Please select a reporting manager</span>
          )}
        </div>

        {isLoadingManagers ? (
          <div className="text-sm text-gray-500 animate-pulse py-4">Fetching active leadership roster...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[220px] overflow-y-auto pr-1">
            {managers.map((manager) => {
              const isSelected = selectedManagerId === manager._id;
              return (
                <div
                  key={manager._id}
                  onClick={() => setValue("managerId", manager._id, { shouldValidate: true })}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${isSelected
                    ? 'border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10 ring-2 ring-brand-blue'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                >
                  <input
                    type="radio"
                    name="managerId"
                    checked={isSelected}
                    onChange={() => { }}
                    className="mt-1 h-4 w-4 accent-brand-blue pointer-events-none"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {manager.name}
                    </span>
                    <span className="text-[11px] text-gray-500 mt-0.5">
                      {manager.position} • <span className="font-mono font-semibold">{manager.employeeCode}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Row 5: System Management Privileges Configuration Checklist */}
      <div className="flex flex-col gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
          <input
            type="checkbox"
            className="rounded border-gray-300 accent-brand-blue"
            {...register("isLeadershipRole")} // Fixed: Using proper registration instead of watch mapping leaks
          />
          Designate profile as Leadership / Core Management Role
        </label>

        {isEditMode && (
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <label className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-400 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                className="rounded border-amber-500 accent-amber-500"
                {...register("isAppAdmin")} // Fixed: Using proper registration instead of watch mapping leaks
              />
              Grant Application Admin Privileges (Critical Technical Clearance)
            </label>
          </div>
        )}
      </div>

      {/* Row 6: Conditional Profile Termination Reason Summary Section */}
      {status === "Inactive" && (
        <div className="pt-4 border-t border-red-100 dark:border-red-900/30">
          <FormInput
            name="deactivateReason"
            label="Deactivation Reason*"
            placeholder="Provide formal breakdown or criteria for profile termination"
          />
        </div>
      )}
    </div>
  );
}