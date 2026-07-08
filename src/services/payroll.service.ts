
import { HR_API } from "@/constants/API/api";
import apiClient from "@/constants/API/client";

export interface GetPayrollParams {
    month?: number;
    year?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
    employeeId?: string;
    self?: string;
    page?: number;
    limit?: number;
    search?: string;
}

export const payrollService = {
    // Fetch paginated payroll list (supports filters, search, and permissions)
    getPayrollList: async (params: GetPayrollParams) => {
        const response = await apiClient.get(HR_API.GET_PAYROLL_LIST, { params });
        return response.data;
    },

    // Triggers the batch processing loop for all active employees
    processAllActive: async (fromDate: string, toDate: string, month: number, year: number, processedById: string) => {
        // Swapped axios.post for apiClient.post to pass token verification smoothly
        const response = await apiClient.post(HR_API.PROCESS_ALL_ACTIVE_PAYROLL, {
            fromDate,
            toDate,
            targetMonth: month,
            targetYear: year,
            processedById,
        });
        return response.data; // Expected structure: { totalProcessed, successful, failed, errors }
    },
};