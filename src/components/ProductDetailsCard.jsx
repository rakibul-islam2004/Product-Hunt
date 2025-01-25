import React, { useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ProductDetailsCard = ({
  product,
  onUpvote,
  reviews,
  onReviewSubmit,
  userRating,
  setUserRating,
  isOwner,
  hasUpvoted,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [isReported, setIsReported] = useState(product.isReported || false);
  const [isLoading, setIsLoading] = useState(false); // Local loading state

  // Function to update the "isReported" property in the database
  const updateReportedStatus = async (productId, newReportedStatus) => {
    setIsLoading(true); // Start loading
    try {
      await axios.put(`http://localhost:5000/updateIsReported/${productId}`, {
        isReported: newReportedStatus,
      });
      setIsReported(newReportedStatus); // Update the local state
    } catch (error) {
      console.error("Failed to update reported status:", error);
      alert(
        "An error occurred while updating the reported status. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle review submission
  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (reviewText.trim()) {
      onReviewSubmit(reviewText, userRating);
      setReviewText(""); // Reset review text after submission
    }
  };

  // Handle report/unreport functionality
  const handleReportToggle = () => {
    confirmAlert({
      title: isReported ? "Unreport Product" : "Report Product",
      message: isReported
        ? "Are you sure you want to unreport this product?"
        : "Are you sure you want to report this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => updateReportedStatus(product._id, !isReported),
        },
        {
          label: "No",
        },
      ],
    });
  };

  // Ensure reviews is an array to avoid rendering issues
  const validReviews = Array.isArray(reviews) ? reviews : [];

  // Define a base URL for images
  const baseImageUrl = "http://localhost:5000/";

  // Replace the backslash with a forward slash in the image path
  const productImageUrl = product?.image
    ? `${baseImageUrl}${product.image.replace("\\", "/")}`
    : "/default-product.png";

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500"></div>
        </div>
      )}

      {/* Product Information */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.description}</p>
          <div className="flex items-center mt-4">
            <button
              onClick={isOwner ? null : onUpvote}
              disabled={isOwner}
              className={`px-4 py-2 font-bold text-white rounded ${
                hasUpvoted ? "bg-gray-500" : "bg-green-500"
              }`}
            >
              {hasUpvoted ? "Unvote" : "Upvote"} ({product.upvotes?.length || 0}
              )
            </button>
          </div>
        </div>
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img
            src={productImageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Report/Unreport Button */}
      <div className="mt-4">
        <button
          onClick={handleReportToggle}
          className={`px-4 py-2 font-bold text-white rounded ${
            isReported ? "bg-blue-500" : "bg-red-500"
          }`}
          disabled={isLoading} // Disable button during loading state
        >
          {isReported ? "Unreport" : "Report"}
        </button>
      </div>

      {/* Reviews Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="space-y-4 mt-4">
          {validReviews.length > 0 ? (
            validReviews.map((review, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={review.reviewerImage || "/default-avatar.png"}
                    alt={review.reviewerName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="ml-2 text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-1">
                    {review.reviewDescription}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>

      {/* Review Submission Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Leave a Review</h3>
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-2 border rounded-md"
            rows="4"
          />
          <div className="flex items-center mt-2">
            <label htmlFor="rating" className="mr-2">
              Rating:
            </label>
            <select
              id="rating"
              value={userRating}
              onChange={(e) => setUserRating(Number(e.target.value))}
              className="border rounded-md p-2"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
