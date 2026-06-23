"use client";

import { useState, useEffect, useCallback } from "react";
import { attendanceService } from "@/services/attendanceService";

export function usePendingCorrectionsCount() {
  const [pendingCount, setPendingCount] = useState<number>(0);

  const fetchCount = useCallback(async () => {
    try {
      const count = await attendanceService.getPendingCorrectionsCount();
      setPendingCount(count);
    } catch (error) {
      console.error("Failed to fetch pending corrections count:", error);
      setPendingCount(0);
    }
  }, []);

  useEffect(() => {
    fetchCount();

    window.addEventListener('correctionProcessed', fetchCount);

    return () => {
      window.removeEventListener('correctionProcessed', fetchCount);
    };
  }, [fetchCount]);

  return { pendingCount };
}