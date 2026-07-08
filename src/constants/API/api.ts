const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const API = {
  // LOGIN: `${BASE_URL}/admin/login`,

  LOGIN_DIRECTOR: `${SERVER_URL}/api/auth/director/login`,
  LOGIN_EMPLOYEE: `${SERVER_URL}/api/auth/employee/login`,


  GET_PROFILE: `${BASE_URL}/admin/get-profile`,
  EDIT_PROFILE: `${BASE_URL}/admin/edit-profile`,
  CHANGE_PASSWORD: `${BASE_URL}/admin/change-password`,
  ADD_NEW_TEACHER: `${BASE_URL}/admin/add-new-teacher`,
  GET_ALL_ADMINS: `${BASE_URL}/admin/get-all-admins`,
  TOGGLE_STATUS: `${BASE_URL}/admin/toggle-active-status`,
  DELETE_ADMIN: `${BASE_URL}/admin/delete-admin`,

  GET_HOLIDAYS: `${BASE_URL}/admin/get-holidays`,
  ADD_HOLIDAY: `${BASE_URL}/admin/add-holiday`,
  DELETE_HOLIDAY: `${BASE_URL}/admin/delete-holiday`,

  GET_STATS: `${BASE_URL}/admin/get-stats`,
  GET_ATTENDANCE_STATS: `${BASE_URL}/admin/get-attendance-stats`,
  GET_GENDER_STATS: `${BASE_URL}/admin/get-gender-stats`,
  GET_TOP_ATTENDANTS: `${BASE_URL}/admin/get-top-attendants`,
  GET_WEEKLY_ATTENDANCE: `${BASE_URL}/admin/get-weekly-attendance`,
  GET_ALL_STUDENTS: `${BASE_URL}/admin/get-all-students`,
  GET_STUDENT_DETAILS: `${BASE_URL}/admin/get-student`,
  EDIT_STUDENT_DETAILS: `${BASE_URL}/admin/edit-student-details`,
  REGISTER_NEW_STUDENT: `${BASE_URL}/admin/register-new-student`,
  DELETE_STUDENT: `${BASE_URL}/admin/delete-student`,

  MARK_ATTENDANCE: `${BASE_URL}/admin/mark-attendance`,
  GET_ATTENDANCE: `${BASE_URL}/admin/get-attendance`,
  GENERATE_CERTIFICATE: `${BASE_URL}/admin/generate-certificate`,
};

export const HR_API = {
  LOGIN_HR: `${SERVER_URL}/api/auth/hr/login`,
  GET_GENERAL_STATS: `${SERVER_URL}/api/web/hr/get-general-stats`,
  GET_ATTENDANCE_STATS: `${SERVER_URL}/api/web/hr/get-average-stats`,
  GET_DEPARTMENT_STATS: `${SERVER_URL}/api/web/hr/get-department-stats`,
  GET_RECENT_JOINED_EMPLOYEES: `${SERVER_URL}/api/web/hr/get-recent-joined-employees`,
  GET_UPCOMING_BIRTHDAYS: `${SERVER_URL}/api/web/hr/get-upcoming-birthdays`,
  GET_LIVE_ROSTER: `${SERVER_URL}/api/web/hr/attendance/live-roster`,
  GET_PENDING_CORRECTIONS_COUNT: `${SERVER_URL}/api/web/hr/attendance/pending-corrections-count`,
  GET_CORRECTIONS: `${SERVER_URL}/api/web/hr/attendance/corrections`,
  APPROVE_CORRECTION: (id: string) => `${SERVER_URL}/api/web/hr/attendance/corrections/${id}/approve`,
  REJECT_CORRECTION: (id: string) => `${SERVER_URL}/api/web/hr/attendance/corrections/${id}/reject`,
  GET_HISTORICAL_LEDGER: `${SERVER_URL}/api/web/hr/attendance/historical-ledger`,
  GET_PENDING_LEAVES: `${SERVER_URL}/api/web/hr/leaves/pending`,
  APPROVE_LEAVE: (id: string) => `${SERVER_URL}/api/web/hr/leaves/${id}/approve`,
  REJECT_LEAVE: (id: string) => `${SERVER_URL}/api/web/hr/leaves/${id}/reject`,
  GET_HISTORICAL_LEAVES: `${SERVER_URL}/api/web/hr/leaves/historical`,
  GET_ALL_EMPLOYEES: `${SERVER_URL}/api/web/hr/employees`,
  GET_SINGLE_EMPLOYEE: `${SERVER_URL}/api/web/hr/employees`,
  GET_MANAGER_LIST: `${SERVER_URL}/api/web/hr/employees/leadership`,
  GET_NEW_EMPLOYEE_CODE: `${SERVER_URL}/api/web/hr/employees/new-code`,
  CREATE_EMPLOYEE: `${SERVER_URL}/api/web/hr/employees/create`,
  GET_PAYROLL_LIST: `${SERVER_URL}/api/web/hr/payroll/payrollList`,
  PROCESS_ALL_ACTIVE_PAYROLL: `${SERVER_URL}/api/web/hr/payroll/process-all-active`,
}
