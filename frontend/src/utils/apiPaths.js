const BASE_URL = "http://localhost:8000/api/v1";

export const API_PATHS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,

  ADD_INCOME: `${BASE_URL}/income/add`,
  GET_INCOME: `${BASE_URL}/income`,

  ADD_EXPENSE: `${BASE_URL}/expense/add`,
  GET_EXPENSE: `${BASE_URL}/expense`,

  DASHBOARD: `${BASE_URL}/dashboard`,
};