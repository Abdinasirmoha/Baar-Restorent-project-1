import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "adminProfile";

const defaultProfile = {
  name: "Guest User",
  email: "guest@roastlux.com",
  phone: "+88 01234 567890",
  memberSince: "2026",
  avatar: "",
};

const ProfileContext = createContext(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const savedProfile = window.localStorage.getItem(STORAGE_KEY);
    if (!savedProfile) {
      return defaultProfile;
    }

    try {
      const parsed = JSON.parse(savedProfile);
      return { ...defaultProfile, ...parsed };
    } catch {
      return defaultProfile;
    }
  });

  const saveProfile = (nextProfile) => {
    setProfile(nextProfile);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
  };

  const updateProfile = (updates) => {
    const merged = { ...profile, ...updates };
    saveProfile(merged);
  };

  const resetProfile = () => {
    saveProfile(defaultProfile);
  };

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
      resetProfile,
      defaultProfile,
    }),
    [profile]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
