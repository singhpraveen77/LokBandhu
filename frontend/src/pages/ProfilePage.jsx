import React, { useState } from "react";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/029/271/062/small_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg"
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };


  //added

  const handleSave = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle save logic here (API call or state update)
    console.log({ username, password, profileImage });
    alert("Changes saved!");
  };

  return (
    <div className="min-h-screen bg-[#111714] font-sans text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">Account Settings</h1>

        {/* Profile Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Profile Information</h2>
          <input
            className="w-full rounded-xl bg-[#29382f] px-4 h-12 placeholder:text-white/50 text-white focus:outline-0 focus:ring-2 focus:ring-[var(--primary-color)]"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-xl bg-[#29382f] px-4 h-12 placeholder:text-white/50 text-white focus:outline-0 focus:ring-2 focus:ring-[var(--primary-color)]"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-xl bg-[#29382f] px-4 h-12 placeholder:text-white/50 text-white focus:outline-0 focus:ring-2 focus:ring-[var(--primary-color)]"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Profile Image */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Profile Image</h2>
          <div className="flex items-center gap-6">
            <div
              className="w-32 h-32 bg-center bg-cover rounded-full"
              style={{ backgroundImage: `url(${profileImage})` }}
            ></div>
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-center gap-2 rounded-full h-10 px-5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold cursor-pointer">
                <span className="material-symbols-outlined">upload</span>
                Upload New Image
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
              <p className="text-xs text-white/50">PNG, JPG, GIF up to 10MB.</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          className="w-full sm:w-auto rounded-full h-12 px-8 bg-[var(--primary-color)] text-[#111714] font-bold hover:scale-105 transition-transform"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
