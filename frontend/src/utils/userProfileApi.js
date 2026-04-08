import { API_PATHS } from "./apiPaths";
import { getAuthHeaders } from "./auth";

export const mapBackendUserToClient = (data) => ({
  id: data.id || data._id || "",
  name: data.fullName || "",
  fullName: data.fullName || "",
  email: data.email || "",
  profilePic: data.profileImageUrl || "",
  age: data.age ?? "",
  gender: data.gender || "",
});

export const mapClientUserToBackend = (user) => ({
  fullName: (user?.fullName || user?.name || "").trim(),
  email: (user?.email || "").trim().toLowerCase(),
  password: user?.password || "",
  profileImageUrl: user?.profilePic || "",
  age: user?.age ?? "",
  gender: user?.gender || "",
});

export const saveUserProfileToServer = async (user) => {
  const response = await fetch(API_PATHS.UPDATE_USER, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(mapClientUserToBackend(user)),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to save user profile");
  }

  return mapBackendUserToClient(result);
};

