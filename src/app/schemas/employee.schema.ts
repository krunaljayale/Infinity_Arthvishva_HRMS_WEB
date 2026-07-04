import { z } from 'zod';

export const DEPARTMENTS = [
    'Director', 'Engineering', 'Sales', 'Marketing', 'Finance', 'Operations', 'HR', 'IT',
    'Accountant', 'Area Manager', 'Driver', 'Helper', 'Office Boy', 'Wealth Advisor', 'BDM'
] as const;

export const POSITIONS = [
    'Intern', 'Junior Developer', 'Software Developer', 'Tester', 'Android Developer',
    'iOS Developer', 'App Developer', 'Senior Developer', 'Manager', 'Director', 'VP',
    'General Manager', 'Specialist', 'HR Executive', 'System Administrator'
] as const;

export const GRADUATION_COURSES = [
    'B.Tech', 'BE', 'BCA', 'B.Sc', 'BCS', 'B.Com', 'B.A', 'BBA', 'B.Ed', 'Other',
];

export const POST_GRADUATION_COURSES = [
    'M.Tech', 'ME', 'MCA', 'M.Sc', 'MCS', 'M.Com', 'M.A', 'MBA', 'M.Ed', 'Other',
];

// Helper Sub-schema matching NestJS AddressDetails class
const addressDetailsSchema = z.object({
    address: z.string().min(5, "Address description details are required"),
    pinCode: z.string().regex(/^\d{6}$/, "Must be an exact 6-digit PIN code"),
    state: z.string().min(2, "State selection is required"),
    district: z.string().min(2, "District is required"),
    city: z.string().min(2, "City is required"),
});

// ==========================================
// INDIVIDUAL WIZARD STEP SCHEMA SEPARATIONS
// ==========================================

export const step1BaseSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    mobileNumber: z.string()
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    alternateMobileNumber: z.string()
        .regex(/^\d{10}$/, "Alternate mobile number must be exactly 10 digits")
        .optional()
        .or(z.literal('')),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
});

export const step1Schema = step1BaseSchema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const step2Schema = z.object({
    gender: z.enum(['Male', 'Female', 'Other'], { message: "Gender selection is required" }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional().or(z.literal('')),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed']).optional().or(z.literal('')),
    profileImageUrl: z.string().optional().or(z.literal('')),
    fatherName: z.string().min(2, "Father's name is required"),
    motherName: z.string().min(2, "Mother's name is required"),

    // Natively structural nested address matching MultiResidencyAddress class
    address: z.object({
        current: addressDetailsSchema,
        permanent: addressDetailsSchema,
    }),
    isSameAsCurrent: z.boolean().optional(),
});

export const step3Schema = z.discriminatedUnion("experienceType", [
    z.object({
        experienceType: z.literal("Fresher"),
        // Fix: Force absolute conversion to undefined if the trimmed value is empty
        totalExperienceYears: z.preprocess(
            (val) => (val === null || val === undefined || String(val).trim() === '') ? undefined : Number(val),
            z.number().optional()
        ),
        lastCompanyName: z.string().optional().or(z.literal('')),
        experienceCertificateUrl: z.string().optional().or(z.literal(''))
    }),
    z.object({
        experienceType: z.literal("Experienced"),
        totalExperienceYears: z.preprocess(
            (val) => (val === null || val === undefined || String(val).trim() === '') ? undefined : Number(val),
            z.number().min(0, "Experience tracking duration required")
        ),
        lastCompanyName: z.string().min(2, "Previous employer company name is required"),
        experienceCertificateUrl: z.string().optional().or(z.literal(''))
    })
]);

export const step4Schema = z.discriminatedUnion("hasDisease", [
    z.object({
        hasDisease: z.literal("No"),
        diseaseName: z.string().optional().or(z.literal('')),
        diseaseType: z.string().optional().or(z.literal('')),
        diseaseSince: z.string().optional().or(z.literal('')),
        medicinesRequired: z.string().optional().or(z.literal('')),
        doctorName: z.string().optional().or(z.literal('')),
        doctorContact: z.string().optional().or(z.literal('')),
        medicalDocumentUrl: z.string().optional().or(z.literal(''))
    }),
    z.object({
        hasDisease: z.literal("Yes"),
        diseaseName: z.string().min(2, "Disease name details are required"),
        diseaseType: z.string().min(2, "Disease category classification required"),
        diseaseSince: z.string().min(2, "Onset timeline duration is required"),
        medicinesRequired: z.string().min(2, "Specify ongoing medical therapies or state 'None'"),
        doctorName: z.string().min(2, "Consulting practitioner name required"),
        doctorContact: z.string().min(10, "Valid practitioner telephone contact required"),
        medicalDocumentUrl: z.string().optional().or(z.literal(''))
    })
]);

export const step5Schema = z.object({
    employeeCode: z.string(),
    role: z.enum(['Employee', 'Intern'], { message: "Role selection is required" }),
    isAppAdmin: z.boolean().default(false),
    status: z.enum(['Active', 'Inactive']).default('Active'),
    deactivateReason: z.string().optional().or(z.literal('')),
    joiningDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format YYYY-MM-DD"),
    department: z.enum([DEPARTMENTS[0], ...DEPARTMENTS.slice(1)], { message: "Department is required" }),
    position: z.enum([POSITIONS[0], ...POSITIONS.slice(1)], { message: "Position is required" }),
    isLeadershipRole: z.boolean().default(false),
    managerId: z.string().min(1, "Select exactly one reporting manager from the list"),

    // Legal Fix-Amount Split Inputs
    salary: z.preprocess((val) => Number(val), z.number().min(1, "Monthly base salary is required")),
    fixedAllowance: z.preprocess((val) => val === '' ? 0 : Number(val), z.number().min(0).default(0)),

    // Auto-computed gross helper field validation target
    grossSalary: z.preprocess((val) => Number(val), z.number().min(1))
});

export const step6Schema = z.object({
    hscPercent: z.preprocess(
        (val) => (val === null || val === undefined || String(val).trim() === '') ? undefined : Number(val),
        z.number().min(1, "HSC percentage metric is required")
    ),
    graduationCourse: z.string().optional().or(z.literal('')),
    // Fix: Cleanly strip empty string spaces before NaN numerical conversion occurs
    graduationPercent: z.preprocess(
        (val) => (val === null || val === undefined || String(val).trim() === '') ? undefined : Number(val),
        z.number().optional()
    ),
    postGraduationCourse: z.string().optional().or(z.literal('')),
    // Fix: Cleanly strip empty string spaces before NaN numerical conversion occurs
    postGraduationPercent: z.preprocess(
        (val) => (val === null || val === undefined || String(val).trim() === '') ? undefined : Number(val),
        z.number().optional()
    ),
    tenthMarksheetUrl: z.string().optional().or(z.literal('')),
    twelfthMarksheetUrl: z.string().optional().or(z.literal('')),
    graduationMarksheetUrl: z.string().optional().or(z.literal('')),
    postGraduationMarksheetUrl: z.string().optional().or(z.literal('')),
});

export const step7Schema = z.object({
    aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits"),
    panNumber: z.string()
        .trim() // Automatically removes accidental leading or trailing spaces
        .toUpperCase() // Automatically converts lowercase letters to uppercase
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN standard layout (e.g. ABCDE1234F)"),
    aadhaarFileUrl: z.string().min(1, "Aadhaar verification document copy is required"),
    panFileUrl: z.string().min(1, "PAN copy upload required")
});

export const step8Schema = z.object({
    accountHolderName: z.string().min(2, "Beneficiary routing name string required"),
    bankName: z.string().min(2, "Financial institution identity name required"),
    accountNumber: z.string().regex(/^\d{9,18}$/, "Account identifier must be between 9 and 18 digits"),
    ifsc: z.string().transform((val) => val.toUpperCase()).refine((val) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(val), {
        message: "Invalid clearance standard code layout (e.g. HDFC0001234)"
    }),
    branch: z.string().min(2, "Sorting branch localization string required"),
    passbookFileUrl: z.string().min(1, "Passbook or clearance pass document copy is required")
});

export const step9Schema = z.object({
    emergencyContactName: z.string().min(2, "Safety target response point name required"),
    emergencyContactRelationship: z.string().min(2, "Relative connection type status required"),
    emergencyContactMobile: z.string().min(10, "Valid baseline mobile route standard required"),
    emergencyContactAddress: z.string().optional().or(z.literal(''))
});

// ==========================================
// MASTER COMBINED FORM COMPOSITION (FIXED)
// ==========================================
export const completeEmployeeSchema = z.object({
    // Step 1 fields
    ...step1BaseSchema.shape,

    // Step 2 fields
    ...step2Schema.shape,

    // Step 5 fields
    ...step5Schema.shape,

    // Step 6 fields
    ...step6Schema.shape,

    // Step 7 fields
    ...step7Schema.shape,

    // Step 8 fields
    ...step8Schema.shape,

    // Step 9 fields
    ...step9Schema.shape,
}).and(
    // Safely intersect the discriminated unions at the root level
    z.object({}).and(step3Schema).and(step4Schema)
).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type EmployeeFormData = z.infer<typeof completeEmployeeSchema>;



export function transformWizardToBackendPayload(data: EmployeeFormData) {
    // Dynamically calculate basic and allowance percentage values for payroll compatibility tracking
    const baseAmount = data.salary;
    const allowanceAmount = data.fixedAllowance;
    const totalGross = baseAmount + allowanceAmount;

    const basicPercentageCalculated = totalGross > 0 ? Math.round((baseAmount / totalGross) * 100) : 100;
    const allowancePercentageCalculated = totalGross > 0 ? 100 - basicPercentageCalculated : 0;

    return {
        // Core Mongoose Identity Setup
        employeeCode: data.employeeCode,
        password: data.password,
        role: data.role,
        isAppAdmin: data.isAppAdmin,
        status: data.status,
        deactivateReason: data.deactivateReason || undefined,

        // Basic Info Elements
        name: data.name,
        email: data.email,
        mobileNumber: data.mobileNumber,
        alternateMobileNumber: data.alternateMobileNumber || undefined,
        gender: data.gender,
        bloodGroup: data.bloodGroup || undefined,
        dateOfBirth: data.dob ? new Date(data.dob) : undefined,
        maritalStatus: data.maritalStatus || undefined,
        profileImageUrl: data.profileImageUrl || undefined,

        // Encapsulated Structured Address Sub-documents
        address: {
            current: {
                address: data.address.current.address,
                pinCode: data.address.current.pinCode,
                state: data.address.current.state,
                district: data.address.current.district,
                city: data.address.current.city
            },
            permanent: {
                address: data.address.permanent.address,
                pinCode: data.address.permanent.pinCode,
                state: data.address.permanent.state,
                district: data.address.permanent.district,
                city: data.address.permanent.city
            }
        },

        // Job Operational Layout Parameters
        joiningDate: data.joiningDate ? new Date(data.joiningDate) : undefined,
        department: data.department,
        position: data.position,
        isLeadershipRole: data.isLeadershipRole,
        managerId: data.managerId,

        // Exact Constant Compensation Amounts
        salary: baseAmount,
        fixedAllowance: allowanceAmount,

        // Backwards Payroll Percentage Policy Auto-balancing Block
        salaryStructure: {
            basicPercentage: basicPercentageCalculated,
            allowancePercentage: allowancePercentageCalculated
        },

        // Professional Experience Identifiers
        experienceType: data.experienceType,
        totalExperienceYears: data.totalExperienceYears ?? undefined,
        lastCompanyName: data.lastCompanyName || undefined,
        experienceCertificateUrl: data.experienceCertificateUrl || undefined,

        // Academic Qualifications Metrics
        hscPercent: data.hscPercent,
        graduationCourse: data.graduationCourse || undefined,
        graduationPercent: data.graduationPercent ?? undefined,
        postGraduationCourse: data.postGraduationCourse || undefined,
        postGraduationPercent: data.postGraduationPercent ?? undefined,
        tenthMarksheetUrl: data.tenthMarksheetUrl || undefined,
        twelfthMarksheetUrl: data.twelfthMarksheetUrl || undefined,
        graduationMarksheetUrl: data.graduationMarksheetUrl || undefined,
        postGraduationMarksheetUrl: data.postGraduationMarksheetUrl || undefined,

        // Government Legal Identification Redaction Standard Mappings
        aadhaarNumber: data.aadhaarNumber,
        panNumber: data.panNumber,
        aadhaarFileUrl: data.aadhaarFileUrl,
        panFileUrl: data.panFileUrl,

        // Bank Routing Infrastructures
        accountHolderName: data.accountHolderName,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        ifsc: data.ifsc,
        branch: data.branch,
        passbookFileUrl: data.passbookFileUrl,

        // Emergency Safeguard Parameters
        emergencyContactName: data.emergencyContactName,
        emergencyContactRelationship: data.emergencyContactRelationship,
        emergencyContactMobile: data.emergencyContactMobile,
        emergencyContactAddress: data.emergencyContactAddress || undefined,

        // Chronic Diseases Status Contexts
        hasDisease: data.hasDisease,
        diseaseName: data.diseaseName || undefined,
        diseaseType: data.diseaseType || undefined,
        diseaseSince: data.diseaseSince || undefined,
        medicinesRequired: data.medicinesRequired || undefined,
        doctorName: data.doctorName || undefined,
        doctorContact: data.doctorContact || undefined
    };
}