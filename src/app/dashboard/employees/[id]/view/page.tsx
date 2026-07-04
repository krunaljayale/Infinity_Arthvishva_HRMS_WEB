"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { employeeService } from '@/services/employee.service';
import { ArrowLeft, UserCircle2, ExternalLink, Download } from 'lucide-react';
import GradientButton from '@/components/buttons/GradientButton';
import PageTitleHeader from '@/components/elements/PageTitleHeader';

export default function ViewEmployeeProfilePage() {
    const { id } = useParams();
    const router = useRouter();
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await employeeService.getEmployeeById(id as string);
                setEmployee(res?.data || res);
            } catch (error) {
                console.error("Error retrieving profile summary context:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProfile();
    }, [id]);

    // Format dates cleanly or default to fallback character
    const formatDate = (dateString?: string | Date) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "-";
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }); // e.g., 26-Apr-1988
    };

    // Safely retrieve flat values or fallback to "-"
    const displayValue = (val: any) => {
        if (val === undefined || val === null || val === '') return "-";
        return val.toString();
    };

    if (loading) {
        return <div className="p-12 text-center text-gray-500">Loading profile configurations...</div>;
    }

    if (!employee) {
        return <div className="p-12 text-center text-red-500">Employee configuration context not found.</div>;
    }

    // Helper component to render individual data cell blocks
    const DataField = ({ label, value }: { label: string; value: any }) => (
        <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">{label}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{displayValue(value)}</span>
        </div>
    );

    // Helper component to render structural row lines for files with view/download capabilities
    const DocumentRow = ({ title, fileUrl }: { title: string; fileUrl?: string }) => (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</span>
            <div className="flex items-center gap-2">
                {fileUrl ? (
                    <>
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium border border-blue-200 text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            <ExternalLink className="w-3 h-3" /> View
                        </a>
                        <a
                            href={fileUrl}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium border border-green-200 text-green-600 bg-green-50/50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 rounded-lg hover:bg-green-100 transition-colors"
                        >
                            <Download className="w-3 h-3" /> Download
                        </a>
                    </>
                ) : (
                    <span className="text-xs font-medium text-gray-400 px-3 py-1">Not Uploaded</span>
                )}
            </div>
        </div>
    );

    return (
        <div className="p-8 space-y-6 w-full mx-auto bg-gray-50/50 dark:bg-gray-900/20 min-h-screen">

            <PageTitleHeader
                title="Employee Details"
                description="Manage team members, roles, and view detailed profiles."
            />

            {/* Header Navigation Block */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to List
                </button>
                <GradientButton onClick={() => router.push(`/employees/${id}/edit`)}>
                    Edit Profile
                </GradientButton>
            </div>

            {/* Profile Header Card */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex items-center gap-5">
                {employee.profileImageUrl ? (
                    <img src={employee.profileImageUrl} alt="" className="w-16 h-16 rounded-xl object-cover border border-gray-200" />
                ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 font-bold text-xl uppercase">
                        {employee.name?.substring(0, 2) || "EM"}
                    </div>
                )}
                <div className="space-y-1 flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">{displayValue(employee.name)}</h2>
                    <div className="text-xs font-medium text-gray-500 space-y-0.5">
                        <p>Employee Code: <span className="font-mono font-bold text-gray-700 dark:text-gray-300">{displayValue(employee.employeeCode)}</span></p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-gray-600 text-white dark:bg-gray-700 font-bold rounded text-[10px] uppercase tracking-wide">
                            {displayValue(employee.position)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Basic Details Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-[#573CFF] dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/40">Basic Details</h3>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                    <DataField label="Email" value={employee.email} />
                    <DataField label="Mobile" value={employee.mobileNumber} />
                    <DataField label="Alternate Mobile" value={employee.alternateMobileNumber} />
                    <DataField label="Gender" value={employee.gender} />
                    <DataField label="DOB" value={formatDate(employee.dateOfBirth)} />
                    <DataField label="Marital Status" value={employee.maritalStatus} />
                </div>
            </div>

            {/* Address Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-[#573CFF] dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/40">Address</h3>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">Current Address</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                            {employee.address?.current?.address
                                ? `${employee.address.current.address}, ${employee.address.current.city}, ${employee.address.current.state} ${employee.address.current.pinCode}`
                                : "-"}
                        </span>
                    </div>
                    <div>
                        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">Permanent Address</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                            {employee.address?.permanent?.address
                                ? `${employee.address.permanent.address}, ${employee.address.permanent.city}, ${employee.address.permanent.state} ${employee.address.permanent.pinCode}`
                                : "-"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Job Details Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-[#573CFF] dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/40">Job Details</h3>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                    <DataField label="Joining Date" value={formatDate(employee.joiningDate)} />
                    <DataField label="Department" value={employee.department} />
                    <DataField label="Position" value={employee.position} />
                    <DataField label="Salary" value={employee.salary ? Number(employee.salary).toFixed(2) : undefined} />
                    <DataField label="Reporting Manager" value={employee.managerId?.name || employee.managerId} />
                    <DataField label="Status" value={employee.status} />
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-[#573CFF] dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/40">Experience</h3>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <DataField label="Experience Type" value={employee.experienceType} />
                        <DataField label="Total Years" value={employee.totalExperienceYears} />
                        <DataField label="Last Company" value={employee.lastCompanyName} />
                    </div>
                    <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                        <span className="text-xs font-bold text-gray-900 dark:text-white block mb-2">Experience Certificates</span>
                        <DocumentRow title="Experience Certificate" fileUrl={employee.experienceCertificateUrl} />
                    </div>
                </div>
            </div>

            {/* Education Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-[#573CFF] dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/40">Education</h3>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-4">
                        <DataField label="12th Percentage" value={employee.hscPercent} />
                        <DataField label="Graduation Course" value={employee.graduationCourse} />
                        <DataField label="Graduation %" value={employee.graduationPercent} />
                        <DataField label="Post Graduation" value={employee.postGraduationCourse || "None"} />
                        <DataField label="PG %" value={employee.postGraduationPercent} />
                    </div>
                    <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                        <span className="text-xs font-bold text-gray-900 dark:text-white block mb-2">Marksheet Documents</span>
                        <DocumentRow title="12th Marksheet" fileUrl={employee.twelfthMarksheetUrl} />
                        <DocumentRow title="Graduation Marksheet" fileUrl={employee.graduationMarksheetUrl} />
                        <DocumentRow title="PG Marksheet" fileUrl={employee.postGraduationMarksheetUrl} />
                    </div>
                </div>
            </div>

            {/* ID / Bank / Health Documents Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-[#573CFF] dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/40">ID / Bank / Health Documents</h3>
                <div className="p-6 space-y-3">
                    <DocumentRow title="Aadhaar Card" fileUrl={employee.aadhaarFileUrl} />
                    <DocumentRow title="PAN Card" fileUrl={employee.panFileUrl} />
                    <DocumentRow title="Bank Passbook" fileUrl={employee.passbookFileUrl} />
                    <DocumentRow title="Medical Document" fileUrl={employee.medicalDocumentUrl} />
                </div>
            </div>

        </div>
    );
}