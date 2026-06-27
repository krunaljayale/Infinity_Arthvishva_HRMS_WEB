import { EmployeeCardTypes } from '@/services/employee.service';
import { MoreVertical, Edit, UserCircle2 } from 'lucide-react';

interface Props {
    employees: EmployeeCardTypes[];
    onViewProfile: (id: string) => void;
}

export default function EmployeeTable({ employees, onViewProfile }: Props) {
    if (employees.length === 0) {
        return (
            <div className="p-12 text-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500">No employees found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-2xl">Employee</th>
                            <th className="px-6 py-4">Code</th>
                            <th className="px-6 py-4">Role & Department</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {employees.map((emp) => (
                            <tr key={emp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-4">
                                    {emp.profileImageUrl ? (
                                        <img src={emp.profileImageUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <UserCircle2 className="w-10 h-10 text-gray-400" />
                                    )}
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white">{emp.name}</div>
                                        <div className="text-xs text-gray-500">{emp.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium">{emp.employeeCode}</td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-900 dark:text-white font-medium">{emp.position || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">{emp.department || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${emp.status === 'Active'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                        }`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onViewProfile(emp._id)}
                                        className="p-2 text-gray-400 hover:text-[#573CFF] transition-colors"
                                    >
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}