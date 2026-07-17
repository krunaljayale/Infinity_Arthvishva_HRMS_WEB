const DOMAIN_URL = process.env.NEXT_PUBLIC_LOCAL_URL || "";

export const AUTH_API = {
  LOGIN_DIRECTOR: `${DOMAIN_URL}/api/auth/director/login`,
  LOGIN_EMPLOYEE: `/api/auth/employee/login`,
  LOGIN_HR: `${DOMAIN_URL}/api/auth/hr/login`,
}


export const HR_API = {
  GET_PROFILE: `/api/web/hr/get-profile`,
  CHANGE_PASSWORD: `/api/web/hr/change-password`,
  GET_GENERAL_STATS: `/api/web/hr/get-general-stats`,
  GET_ATTENDANCE_STATS: `/api/web/hr/get-average-stats`,
  GET_DEPARTMENT_STATS: `/api/web/hr/get-department-stats`,
  GET_RECENT_JOINED_EMPLOYEES: `/api/web/hr/get-recent-joined-employees`,
  GET_UPCOMING_BIRTHDAYS: `/api/web/hr/get-upcoming-birthdays`,
  GET_LIVE_ROSTER: `/api/web/hr/attendance/live-roster`,
  GET_PENDING_CORRECTIONS_COUNT: `/api/web/hr/attendance/pending-corrections-count`,
  GET_CORRECTIONS: `/api/web/hr/attendance/corrections`,
  APPROVE_CORRECTION: (id: string) => `/api/web/hr/attendance/corrections/${id}/approve`,
  REJECT_CORRECTION: (id: string) => `/api/web/hr/attendance/corrections/${id}/reject`,
  GET_HISTORICAL_LEDGER: `/api/web/hr/attendance/historical-ledger`,
  GET_PENDING_LEAVES: `/api/web/hr/leaves/pending`,
  APPROVE_LEAVE: (id: string) => `/api/web/hr/leaves/${id}/approve`,
  REJECT_LEAVE: (id: string) => `/api/web/hr/leaves/${id}/reject`,
  GET_HISTORICAL_LEAVES: `/api/web/hr/leaves/historical`,
  GET_ALL_EMPLOYEES: `/api/web/hr/employees`,
  GET_SINGLE_EMPLOYEE: `/api/web/hr/employees`,
  GET_MANAGER_LIST: `/api/web/hr/employees/leadership`,
  GET_NEW_EMPLOYEE_CODE: `/api/web/hr/employees/new-code`,
  CREATE_EMPLOYEE: `/api/web/hr/employees/create`,
  UPDATE_EMPLOYEE: (id: string) => `/api/web/hr/employees/${id}`,
  GET_PAYROLL_LIST: `/api/web/hr/payroll/payrollList`,
  PROCESS_ALL_ACTIVE_PAYROLL: `/api/web/hr/payroll/process-all-active`,
  EXPORT_PAYROLL: `/api/web/hr/payroll/export`,
  DOWNLOAD_SALARY_SLIP_PDF: (id: string) => `/api/web/hr/payroll/salary-slip/${id}`,

  GET_PENDING_REIMBURSEMENTS: `/api/web/hr/reimbursement/pending`,
  APPROVE_REIMBURSEMENT: (id: string) => `/api/web/hr/reimbursement/${id}/approve`,
  REJECT_REIMBURSEMENT: (id: string) => `/api/web/hr/reimbursement/${id}/reject`,
  GET_HISTORICAL_REIMBURSEMENTS: `/api/web/hr/reimbursement/historical`,
}