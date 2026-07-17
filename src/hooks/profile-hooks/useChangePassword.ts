"use client";

import React, { useState } from "react";
import { profileService } from "@/services/profile.service";

export function useChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Visibility management toggles
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Notification feedback states
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All password fields are required.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirmation password do not match.");
            return;
        }

        setIsSubmitting(true);
        try {
            await profileService.changeMasterPassword({
                oldPassword,
                newPassword,
            });

            setSuccess("Password security credentials rotated successfully.");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            console.error("Credential rotation execution failed:", err);
            setError(err.response?.data?.message || err.message || "Failed to update authentication credentials.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        showOld,
        setShowOld,
        showNew,
        setShowNew,
        showConfirm,
        setShowConfirm,
        error,
        success,
        isSubmitting,
        handleSubmit,
    };
}