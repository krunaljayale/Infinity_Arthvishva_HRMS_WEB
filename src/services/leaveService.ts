import { HR_API } from "@/constants/API/api";
import apiClient from "@/constants/API/client";
import { PendingLeaveItem } from "@/hooks/leave-hooks/useLeaveInbox";

export const leaveService = {
    async getPendingLeaves(): Promise<PendingLeaveItem[]> {
        const response = await apiClient.get(HR_API.GET_PENDING_LEAVES);
        return response.data.data;
    },

    async approveLeave(leaveId: string): Promise<void> {
        await apiClient.patch(HR_API.APPROVE_LEAVE(leaveId));
    },

    async rejectLeave(leaveId: string, remarks: string): Promise<void> {
        await apiClient.patch(HR_API.REJECT_LEAVE(leaveId), { remarks });
    },

    // Add inside your leaveService object:
    async getHistoricalLeaves(filters: any) {
        const params = new URLSearchParams({
            page: filters.page.toString(),
            limit: filters.limit.toString(),
        });

        if (filters.search) params.append('search', filters.search);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.status) params.append('status', filters.status);
        if (filters.department) params.append('department', filters.department);

        const response = await apiClient.get(`${HR_API.GET_HISTORICAL_LEAVES}?${params.toString()}`);
        return { data: response.data.data, meta: response.data.meta };
    }
};