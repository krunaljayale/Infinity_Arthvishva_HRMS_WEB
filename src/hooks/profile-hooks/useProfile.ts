"use client";

import { useState, useEffect, useCallback } from "react";
import { profileService, HrProfileData } from "@/services/profile.service";
import { logToTerminal } from "@/utils/terminalLogger";

export function useProfile() {
    const [profileData, setProfileData] = useState<HrProfileData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await profileService.getMasterProfile();
            await logToTerminal("Master HR profile configuration matrix:", data);
            setProfileData(data);
        } catch (err: any) {
            console.error("Failed to load Master HR profile configuration matrix:", err);
            setError(err.response?.data?.message || "Failed to load profile details.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return {
        profileData,
        isLoading,
        error,
        refreshProfile: fetchProfile
    };
}