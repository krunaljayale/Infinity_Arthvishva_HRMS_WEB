import { HR_API } from "@/constants/API/api";
import apiClient from "@/constants/API/client";


export interface EmployeeCardTypes {
    _id: string;
    employeeCode: string;
    name: string;
    email: string;
    department?: string;
    position?: string;
    status: 'Active' | 'Inactive';
    profileImageUrl?: string;
    managerName?: string;
}

export const employeeService = {
    async getEmployees(searchQuery: string, department: string, status: string, page: number, limit: number) {

        const response = await apiClient.get(HR_API.GET_ALL_EMPLOYEES, {
            params: {
                search: searchQuery || undefined,
                department: department || undefined,
                status: status || undefined,
                page: page,
                limit: limit
            }
        });

        return { data: response.data.data, meta: response.data.meta };
    },

    async getManagerList() {
        const response = await apiClient.get(HR_API.GET_MANAGER_LIST);
        return response.data;
    },

    async getNewEmployeeCode() {
        const response = await apiClient.get(HR_API.GET_NEW_EMPLOYEE_CODE);
        return response.data;
    },

    // Add this inside your employeeService object
    async createEmployee(formDataPayload: FormData) {
        const response = await apiClient.post(HR_API.CREATE_EMPLOYEE, formDataPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async getEmployeeById(id: string) {
        const response = await apiClient.get(`${HR_API.GET_SINGLE_EMPLOYEE}/${id}`);
        return response.data;
    }
};