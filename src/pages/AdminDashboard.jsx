import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/DashboardLayout";
import axios from "axios";

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState([]);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // Fetch user statistics
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/user-stats"
        );
        setUserStats(response.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    // Fetch available coupons
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/coupons");
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchUserStats();
    fetchCoupons();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">User Statistics</h3>
          <div>
            {userStats.map((stat, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg">
                  {stat.name}: {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Coupons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="p-4 border rounded">
                <p className="text-lg">{coupon.code}</p>
                <p className="text-sm">{coupon.discount}% off</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
