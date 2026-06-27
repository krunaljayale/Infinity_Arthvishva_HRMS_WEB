
import { EmployeeCardTypes } from '@/services/employee.service';
import { UserCircle2, Briefcase } from 'lucide-react';

interface Props {
    employee: EmployeeCardTypes;
    onClick: (id: string) => void;
}

export default function EmployeeCard({ employee, onClick }: Props) {
    const isActive = employee.status === 'Active';

    return (
        <div
            onClick={() => onClick(employee._id)}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            {/* Status Indicator Bar */}
            <div className={`absolute top-0 left-0 w-full h-1.5 ${isActive ? 'bg-brand-green dark:bg-brand-blue/50]' : 'bg-gray-300 dark:bg-gray-600'}`} />

            <div className="flex flex-col items-center text-center mt-2">
                {/* Avatar */}
                {employee.profileImageUrl ? (
                    <img src={employee.profileImageUrl} alt={employee.name} className="w-20 h-20 rounded-full object-cover mb-4 shadow-sm ring-4 ring-gray-50 dark:ring-gray-900" />
                ) : (
                    <UserCircle2 className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
                )}

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate w-full">{employee.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{employee.position || 'No Position Assigned'}</p>

                {/* Meta Pills */}
                <div className="flex items-center gap-2 mt-4">
                    <span className="px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {employee.department || 'N/A'}
                    </span>
                    <span className="px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700">
                        {employee.employeeCode}
                    </span>
                </div>

                {/* Status Badge */}
                <span className={`mt-5 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${isActive
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    {employee.status}
                </span>
            </div>
        </div>
    );
}