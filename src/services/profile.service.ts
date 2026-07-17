import { HR_API } from "@/constants/API/api";
import apiClient from "@/constants/API/client";

// ─── DATA TYPES & INTERFACES ───
export interface HrProfileData {
    idCode: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    employeeAccount: {
        _id: string;
        name: string;
        employeeCode: string;
        email: string;
        department?: string;
        position?: string;
        status?: string;
        role?: string;
    };
}

export interface ChangePasswordParams {
    oldPassword: string;
    newPassword: string;
}

// ─── OBJECT EXPORT PATTERN MAPPED TO SYSTEM CONSTANTS ───
export const profileService = {
    getMasterProfile: async (): Promise<HrProfileData> => {
        const response = await apiClient.get(HR_API.GET_PROFILE);
        return response.data;
    },

    /**
     * Coordinates execution sequence to rotate credentials across the shared Employee document
     */
    changeMasterPassword: async (payload: ChangePasswordParams) => {
        const response = await apiClient.patch(HR_API.CHANGE_PASSWORD, payload);
        return response.data; // Expected response mapping: { success: true, message: '...' }
    }
};