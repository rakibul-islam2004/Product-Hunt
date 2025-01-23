import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // For payment modal
import axios from "axios"; // For API requests
import useAuth from "../hooks/useAuth"; // Custom hook for user authentication

Modal.setAppElement("#root");

const MyProfile = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [isSubscribed, setIsSubscribed] = useState(false); // Subscription status
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [paymentProcessing, setPaymentProcessing] = useState(false); // Payment state

  // Fetch user subscription data
  useEffect(() => {
    const fetchUserSubscription = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${user.email}`
          );
          setIsSubscribed(response.data.isSubscribed || false);
        } catch (error) {
          console.error("Error fetching subscription data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserSubscription();
  }, [user]);

  // Handle opening the payment modal
  const handleSubscriptionClick = () => {
    setIsModalOpen(true);
  };

  // Handle payment success
  const handlePaymentSuccess = async () => {
    setPaymentProcessing(true);
    try {
      await axios.put(`http://localhost:5000/users/${user.email}`, {
        isSubscribed: true,
      });
      setIsSubscribed(true);
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error updating subscription:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500 mt-10">Please log in.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <div className="text-center">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-xl font-semibold mt-4">
            {user.displayName || "User Name"}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="mt-6">
          {isSubscribed ? (
            <div className="text-center">
              <p className="text-green-600 font-semibold">
                Status: Verified Member
              </p>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleSubscriptionClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                disabled={paymentProcessing}
              >
                {paymentProcessing
                  ? "Processing..."
                  : "Subscribe for $10/month"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Complete Payment
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Please complete the payment to activate your subscription.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePaymentSuccess}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
              disabled={paymentProcessing}
            >
              {paymentProcessing ? "Processing..." : "Pay $10"}
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyProfile;
