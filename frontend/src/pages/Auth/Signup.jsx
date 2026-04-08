import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import { validateEmail } from "../../utils/Helper";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import { useUser } from "../../context/UserContext";
import { API_PATHS } from "../../utils/apiPaths";
import { mapBackendUserToClient } from "../../utils/userProfileApi";

const Signup = () => {
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!validateEmail(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      const response = await fetch(API_PATHS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: normalizedEmail,
          password,
          profileImageUrl: profilePic || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Signup failed");
      }

      const userData = mapBackendUserToClient(result);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(userData));
      updateUser(userData);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to signup. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[880px] py-4">
      <h2 className="text-[44px] font-semibold text-slate-950">Create an Account</h2>
      <p className="mt-2 text-lg text-slate-600">Join us today by entering details below.</p>

      <form className="mt-6" onSubmit={handleSignUp}>
        <div className="mb-6 flex justify-center">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        <Input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          label="Full Name"
          placeholder="Dev"
          type="text"
        />

        <div className="mt-1 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            placeholder="dev@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            placeholder="Enter password"
            type="password"
          />
        </div>

        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}

        <button type="submit" className="btn-primary mt-5">
          Sign Up
        </button>

        <p className="mt-3 text-[15px] text-slate-700">
          Already have an account?{" "}
          <Link className="font-semibold text-primary underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
