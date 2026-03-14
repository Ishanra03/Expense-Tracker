import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

const ProfilePhotoSelector = () => {
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        {/* Profile Circle */}
        <div
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-10 h-10 text-purple-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5.121 17.804A9 9 0 1118.879 17.8" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>

        {/* Upload Icon */}
        <div
          onClick={() => fileRef.current.click()}
          className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer"
        >
          <FiUpload className="text-white text-sm" />
        </div>

        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;