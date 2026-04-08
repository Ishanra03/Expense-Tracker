import { useState } from "react";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import { useUser } from "../../context/UserContext";
import { saveUserProfileToServer } from "../../utils/userProfileApi";

const Settings = () => {
  const { user, updateUser } = useUser();

  const [form, setForm] = useState({
    name: user?.name || user?.fullName || "",
    email: user?.email || "",
    password: "",
    age: user?.age || "",
    gender: user?.gender || "",
    profilePic: user?.profilePic || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (imageUrl) => {
    setForm((prev) => ({ ...prev, profilePic: imageUrl || "" }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const updatedUser = {
      ...(user || {}),
      name: form.name.trim(),
      fullName: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      age: form.age ? Number(form.age) : "",
      gender: form.gender,
      profilePic: form.profilePic || "",
    };

    try {
      const savedUser = await saveUserProfileToServer(updatedUser);
      updateUser(savedUser);
      localStorage.setItem("user", JSON.stringify(savedUser));
      setMessage("Profile settings updated and saved to MongoDB Atlas.");
    } catch (error) {
      updateUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage(error.message || "Profile updated locally, but server sync failed.");
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.05)] lg:p-8">
      <h2 className="text-3xl font-semibold text-slate-900">Settings</h2>
      <p className="mt-1 text-slate-500">Update your profile details below.</p>

      <form className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[300px_1fr]" onSubmit={handleSave}>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-lg font-semibold text-slate-800">Profile Photo</h3>
          <p className="mt-1 text-sm text-slate-500">Upload and update your picture.</p>

          <div className="mt-4">
            <ProfilePhotoSelector image={form.profilePic} setImage={handleProfilePicChange} />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleProfilePicChange("")}
              className="rounded-md bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-300"
            >
              Remove Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">User Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter user name"
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Gmail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Gmail"
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Age</label>
            <input
              type="number"
              min="1"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-2.5 font-semibold text-white hover:bg-violet-700"
            >
              Save Changes
            </button>

            {message ? <p className="text-sm font-medium text-emerald-600">{message}</p> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
