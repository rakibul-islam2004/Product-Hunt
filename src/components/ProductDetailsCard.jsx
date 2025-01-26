import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FaThumbsUp } from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(false);

  // update the "isReported" property in the database
  const updateReportedStatus = async (productId, newReportedStatus) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5000/updateIsReported/${productId}`, {
        isReported: newReportedStatus,
      });
      setIsReported(newReportedStatus);
    } catch (error) {
      console.error("Failed to update reported status:", error);
      alert(
        "An error occurred while updating the reported status. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle review submission
  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (reviewText.trim()) {
      onReviewSubmit(reviewText, userRating);
      setReviewText("");
    }
  };

  // Handle report/unreport functionality
  const handleReportToggle = () => {
    Swal.fire({
      title: isReported ? "Unreport Product" : "Report Product",
      text: isReported
        ? "Are you sure you want to unreport this product?"
        : "Are you sure you want to report this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        updateReportedStatus(product._id, !isReported);
      }
    });
  };

  // Ensure reviews is an array to avoid rendering issues
  const validReviews = Array.isArray(reviews) ? reviews : [];

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="animate-spin rounded-md h-12 w-12 border-t-4 border-green-500"></div>
        </div>
      )}

      {/* Product Information */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col w-full lg:w-2/3">
          <h2 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <p className="mt-2 text-lg text-gray-600">{product.description}</p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={isOwner ? null : onUpvote}
              disabled={isOwner}
              className={`px-6 py-3 font-semibold text-white rounded-md transition-colors duration-300 ${
                hasUpvoted ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              } flex items-center gap-2`} // Using flex and gap for proper alignment
            >
              <FaThumbsUp className="inline-block" /> {/* Add the icon here */}
              <span>{hasUpvoted ? "Unvote" : "Upvote"}</span>
              <span>({product.upvotes?.length || 0})</span>{" "}
              {/* Separate text from icon */}
            </button>

            <button
              onClick={handleReportToggle}
              className={`px-6 py-3 font-semibold text-white rounded-md transition-colors duration-300 ${
                isReported ? "bg-blue-500" : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={isLoading}
            >
              {isReported ? "Unreport" : "Report"}
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/3 overflow-hidden rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900">Reviews</h3>
        <div className="mt-4 space-y-6">
          {validReviews.length > 0 ? (
            validReviews.map((review, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={review.reviewerImage || "/default-avatar.png"}
                    alt={review.reviewerName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">
                      {review.reviewerName}
                    </p>
                    <div className="text-yellow-400">
                      {"⭐".repeat(review.rating)}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">
                    {review.reviewDescription}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>

      {/* Review Submission Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900">Leave a Review</h3>
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          />
          <div className="mt-4 flex items-center gap-6">
            <label htmlFor="rating" className="text-lg">
              Rating:
            </label>
            <select
              id="rating"
              value={userRating}
              onChange={(e) => setUserRating(Number(e.target.value))}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="mt-4 bg-green-500 text-white py-3 px-8 rounded-md transition-colors duration-300 hover:bg-green-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
