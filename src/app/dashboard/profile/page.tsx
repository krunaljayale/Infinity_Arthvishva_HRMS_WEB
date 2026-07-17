"use client";

import React from "react";
import PageTitleHeader from "@/components/elements/PageTitleHeader";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ChangePasswordCard from "@/components/cards/Profile/ChangePasswordCard";
import { useProfile } from "@/hooks/profile-hooks/useProfile";
import { AlertCircle } from "lucide-react";

export default function ProfilePage() {
  // Consume decoupled state operational architecture matrix
  const { profileData, isLoading, error } = useProfile();

  // Loading State Skeleton Layout Block
  if (isLoading) {
    return (
      <div className="w-full mx-auto p-6 md:p-8 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/4" />
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full" />
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full" />
      </div>
    );
  }

  // Network Fallback Error Boundary Layout
  if (error) {
    return (
      <div className="w-full mx-auto p-6 md:p-8 space-y-4">
        <PageTitleHeader
          title="System HR Profile"
          description="View administrative core profile variables and modify global authorization tokens."
        />
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400 rounded-2xl text-sm font-medium">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 md:p-8 space-y-8 font-sans relative overflow-hidden">

      {/* Standardized Title Block */}
      <PageTitleHeader
        title="System HR Profile"
        description="View administrative core profile variables and update account security credentials."
      />

      {/* Main Workspace Layout Blocks */}
      <div className="space-y-6">

        {/* Profile Identity Data Module Section */}
        <ProfileHeader
          employeeAccount={profileData?.employeeAccount || {}}
          idCode={profileData?.idCode || ""}
          isActive={profileData?.isActive || false}
        />

        {/* Password Credential Configuration Control Card */}
        <ChangePasswordCard />

      </div>
    </div>
  );
}