import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { EmployeeCardTypes } from "@/services/employee.service";
import { MoreVertical, Edit, UserCircle2, Eye } from "lucide-react";

interface Props {
  employees: EmployeeCardTypes[];
}

export default function EmployeeTable({ employees }: Props) {
  const router = useRouter();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close action dropdown popups automatically if clicking completely outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (employees.length === 0) {
    return (
      <div className="p-12 text-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500">
          No employees found matching your criteria.
        </p>
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
              <tr
                key={emp._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colorson relative"
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  {emp.profileImageUrl ? (
                    <img
                      src={emp.profileImageUrl}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle2 className="w-10 h-10 text-gray-400" />
                  )}
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {emp.name}
                    </div>
                    <div className="text-xs text-gray-500">{emp.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{emp.employeeCode}</td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 dark:text-white font-medium">
                    {emp.position || "N/A"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {emp.department || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/employees/${emp._id}/view`);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-blue hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    View
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
