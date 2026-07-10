"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { employeeService } from '@/services/employee.service';
import imageCompression from 'browser-image-compression';

export const useEditEmployee = (employeeId: string) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [managerOptions, setManagerOptions] = useState<{ label: string, value: string }[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    // Existing URLs mapped for UI preview
    const [existingUrls, setExistingUrls] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        employeeCode: '', password: '', confirmPassword: '', role: 'Employee',
        isAppAdmin: false, status: 'Active', name: '', email: '', mobileNumber: '',
        alternateMobileNumber: '', gender: '', bloodGroup: '', dateOfBirth: '',
        maritalStatus: '', fatherName: '', motherName: '',
        address: {
            current: { address: '', pinCode: '', state: '', district: '', city: '' },
            permanent: { address: '', pinCode: '', state: '', district: '', city: '' }
        },
        joiningDate: '', department: '', position: '', isLeadershipRole: false,
        salary: '', fixedAllowance: '', managerId: '', experienceType: 'Fresher',
        totalExperienceYears: '', lastCompanyName: '', hscPercent: '',
        graduationCourse: '', graduationPercent: '', postGraduationCourse: '',
        postGraduationPercent: '', aadhaarNumber: '', panNumber: '',
        accountHolderName: '', bankName: '', accountNumber: '', ifsc: '', branch: '',
        emergencyContactName: '', emergencyContactRelationship: '',
        emergencyContactMobile: '', emergencyContactAddress: '', hasDisease: 'No',
        diseaseName: '', diseaseType: '', diseaseSince: '', medicinesRequired: '',
        doctorName: '', doctorContact: '',
    });

    const [files, setFiles] = useState<{ [key: string]: File | null }>({
        profileImage: null, experienceCertificate: null, tenthMarksheet: null,
        twelfthMarksheet: null, graduationMarksheet: null, postGraduationMarksheet: null,
        aadhaarFile: null, panFile: null, passbookFile: null, medicalDocument: null,
    });

    useEffect(() => {
        let isMounted = true;
        const fetchInitialData = async () => {
            try {
                const [empRes, managersRes] = await Promise.all([
                    employeeService.getEmployeeById(employeeId),
                    employeeService.getManagerList()
                ]);

                if (isMounted) {
                    const emp = empRes?.data || empRes;
                    const managers = managersRes?.data || managersRes || [];
                    
                    setManagerOptions(managers.map((m: any) => ({ label: m.name, value: m._id })));

                    if (emp) {
                        setFormData({
                            employeeCode: emp.employeeCode || '',
                            password: '', // Keep blank on edit unless modifying
                            confirmPassword: '',
                            role: emp.role || 'Employee',
                            isAppAdmin: !!emp.isAppAdmin,
                            status: emp.status || 'Active',
                            name: emp.name || '',
                            email: emp.email || '',
                            mobileNumber: emp.mobileNumber || '',
                            alternateMobileNumber: emp.alternateMobileNumber || '',
                            gender: emp.gender || '',
                            bloodGroup: emp.bloodGroup || '',
                            dateOfBirth: emp.dateOfBirth ? new Date(emp.dateOfBirth).toISOString().split('T')[0] : '',
                            maritalStatus: emp.maritalStatus || '',
                            fatherName: emp.fatherName || '',
                            motherName: emp.motherName || '',
                            address: {
                                current: emp.address?.current || { address: '', pinCode: '', state: '', district: '', city: '' },
                                permanent: emp.address?.permanent || { address: '', pinCode: '', state: '', district: '', city: '' }
                            },
                            joiningDate: emp.joiningDate ? new Date(emp.joiningDate).toISOString().split('T')[0] : '',
                            department: emp.department || '',
                            position: emp.position || '',
                            isLeadershipRole: !!emp.isLeadershipRole,
                            salary: emp.salary ? String(emp.salary) : '',
                            fixedAllowance: emp.fixedAllowance ? String(emp.fixedAllowance) : '',
                            managerId: emp.managerId?._id || emp.managerId || '',
                            experienceType: emp.experienceType || 'Fresher',
                            totalExperienceYears: emp.totalExperienceYears ? String(emp.totalExperienceYears) : '',
                            lastCompanyName: emp.lastCompanyName || '',
                            hscPercent: emp.hscPercent ? String(emp.hscPercent) : '',
                            graduationCourse: emp.graduationCourse || '',
                            graduationPercent: emp.graduationPercent ? String(emp.graduationPercent) : '',
                            postGraduationCourse: emp.postGraduationCourse || '',
                            postGraduationPercent: emp.postGraduationPercent ? String(emp.postGraduationPercent) : '',
                            aadhaarNumber: emp.aadhaarNumber || '',
                            panNumber: emp.panNumber || '',
                            accountHolderName: emp.accountHolderName || '',
                            bankName: emp.bankName || '',
                            accountNumber: emp.accountNumber || '',
                            ifsc: emp.ifsc || '',
                            branch: emp.branch || '',
                            emergencyContactName: emp.emergencyContactName || '',
                            emergencyContactRelationship: emp.emergencyContactRelationship || '',
                            emergencyContactMobile: emp.emergencyContactMobile || '',
                            emergencyContactAddress: emp.emergencyContactAddress || '',
                            hasDisease: emp.hasDisease || 'No',
                            diseaseName: emp.diseaseName || '',
                            diseaseType: emp.diseaseType || '',
                            diseaseSince: emp.diseaseSince || '',
                            medicinesRequired: emp.medicinesRequired || '',
                            doctorName: emp.doctorName || '',
                            doctorContact: emp.doctorContact || '',
                        });

                        setExistingUrls({
                            profileImage: emp.profileImageUrl,
                            experienceCertificate: emp.experienceCertificateUrl,
                            tenthMarksheet: emp.tenthMarksheetUrl,
                            twelfthMarksheet: emp.twelfthMarksheetUrl,
                            graduationMarksheet: emp.graduationMarksheetUrl,
                            postGraduationMarksheet: emp.postGraduationMarksheetUrl,
                            aadhaarFile: emp.aadhaarFileUrl,
                            panFile: emp.panFileUrl,
                            passbookFile: emp.passbookFileUrl,
                            medicalDocument: emp.medicalDocumentUrl,
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchInitialData();
        return () => { isMounted = false };
    }, [employeeId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleAddressChange = (type: 'current' | 'permanent', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [type]: { ...prev.address[type], [field]: value } }
        }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (e.target.files && e.target.files[0]) {
            const originalFile = e.target.files[0];
            if (originalFile.type.startsWith("image/")) {
                try {
                    const compressedBlob = await imageCompression(originalFile, { maxSizeMB: 0.4, maxWidthOrHeight: 1200, useWebWorker: true });
                    const compressedFile = new File([compressedBlob], originalFile.name, { type: originalFile.type });
                    setFiles(prev => ({ ...prev, [key]: compressedFile }));
                } catch (error) {
                    setFiles(prev => ({ ...prev, [key]: originalFile }));
                }
            } else {
                setFiles(prev => ({ ...prev, [key]: originalFile }));
            }
        }
    };

    const handleSyncAddresses = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFormData(prev => ({ ...prev, address: { ...prev.address, permanent: { ...prev.address.current } } }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Include any required front-end validation rules here (similar to create)
        if (formData.password && formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match." });
            return;
        }

        try {
            setIsSubmitting(true);
            const data = new FormData();

            // Append textual data
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'address') {
                    data.append('address', JSON.stringify(value));
                } else if (key === 'password' || key === 'confirmPassword') {
                    if (value) data.append(key, String(value)); // Only send password if modified
                } else if (value !== undefined && value !== null && value !== '') {
                    data.append(key, String(value));
                }
            });

            // Append NEW files
            Object.entries(files).forEach(([key, file]) => {
                if (file) data.append(key, file);
            });

            await employeeService.updateEmployee(employeeId, data);
            handleBack();
        } catch (error: any) {
            const backendErrorMsg = error.response?.data?.message || error.message;
            const displayMsg = Array.isArray(backendErrorMsg) ? backendErrorMsg.join("\n") : backendErrorMsg;
            alert(`Update Failed:\n\n${displayMsg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => router.back();

    return {
        formData, existingUrls, errors, isLoading, isSubmitting, managerOptions,
        handleChange, handleAddressChange, handleFileChange, handleSyncAddresses, handleSubmit,handleBack
    };
};