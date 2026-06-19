// src/services/auth.service.ts
import axios from "axios";
import { HR_API, API } from "@/constants/API/api";

export const authService = {
  loginHR: async (idCode: string, password: string) => {
    const response = await axios.post(HR_API.LOGIN_HR, { idCode, password });
    return response.data;
  },
  loginDirector: async (employeeCode: string, password: string) => {
    const response = await axios.post(API.LOGIN_DIRECTOR, { employeeCode, password });
    return response.data;
  },
  loginEmployee: async (employeeCode: string, password: string) => {
    const response = await axios.post(API.LOGIN_EMPLOYEE, { employeeCode, password });
    return response.data;
  },
};