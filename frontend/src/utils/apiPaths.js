const BASE_URL = "http://localhost:8000/api/v1";

export const API_PATHS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  GET_USER: `${BASE_URL}/auth/user`,
  UPDATE_USER: `${BASE_URL}/auth/user`,

  ADD_INCOME: `${BASE_URL}/income/add`,
  GET_INCOME: `${BASE_URL}/income`,
  UPDATE_INCOME: (id) => `${BASE_URL}/income/${id}`,
  DELETE_INCOME: (id) => `${BASE_URL}/income/${id}`,

  ADD_EXPENSE: `${BASE_URL}/expense/add`,
  GET_EXPENSE: `${BASE_URL}/expense`,
  UPDATE_EXPENSE: (id) => `${BASE_URL}/expense/${id}`,
  DELETE_EXPENSE: (id) => `${BASE_URL}/expense/${id}`,

  ADD_BUDGET: `${BASE_URL}/budget/add`,
  GET_BUDGET: `${BASE_URL}/budget`,
  UPDATE_BUDGET: (id) => `${BASE_URL}/budget/${id}`,
  DELETE_BUDGET: (id) => `${BASE_URL}/budget/${id}`,

  ADD_GOAL_FUND: `${BASE_URL}/goal-fund/add`,
  GET_GOAL_FUND: `${BASE_URL}/goal-fund`,
  UPDATE_GOAL_FUND: (id) => `${BASE_URL}/goal-fund/${id}`,
  DELETE_GOAL_FUND: (id) => `${BASE_URL}/goal-fund/${id}`,

  DASHBOARD: `${BASE_URL}/dashboard`,
};
