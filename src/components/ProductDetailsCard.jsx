import { useState } from "react";
import UpvoteButton from "./UpvoteButton";
import ReportButton from "./ReportButton";
import ReviewCard from "./ReviewCard";
import useAuth from "../hooks/useAuth";

const ProductDetailsCard = ({
  product,
  onUpvote,
  onReport,
  reviews,
  onReviewSubmit,
}) => {
  const { user } = useAuth();
  const [review, setReview] = useState("");

  const handleReviewSubmit = () => {
    if (review.trim()) {
      onReviewSubmit(product._id, review);
      setReview("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold">{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mt-4 rounded-md"
      />
      <p className="text-gray-500 mt-4">{product.description}</p>
      <p className="text-lg font-semibold mt-4">Price: ${product.price}</p>
      <div className="mt-4">
        <UpvoteButton
          onUpvote={() => onUpvote(product._id)}
          count={product.upvotes}
        />
        <ReportButton onReport={() => onReport(product._id)} />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="mt-4">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        {user && (
          <div className="mt-6">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Write your review..."
            />
            <button
              onClick={handleReviewSubmit}
              className="bg-blue-600 text-white py-2 px-6 rounded-md mt-2"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsCard;
