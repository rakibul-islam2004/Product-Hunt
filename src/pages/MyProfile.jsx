import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import MainLayout from "../layouts/DashboardLayout";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        {user ? (
          <div>
            <h2 className="text-2xl font-semibold">Profile</h2>
            <div className="mt-6">
              <p>Email: {user.email}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </MainLayout>
  );
};

export default MyProfile;
