import React, { useState } from "react";

// ReviewCard Component
const ReviewCard = ({ review }) => {
  const { reviewerName, reviewerImage, reviewDescription, rating } = review;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md my-4">
      <div className="flex items-center">
        <img
          src={reviewerImage}
          alt={reviewerName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="text-xl font-semibold">{reviewerName}</h4>
          <p className="text-gray-500 text-sm">Rating: {rating} / 5</p>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{reviewDescription}</p>
    </div>
  );
};

export default ReviewCard;
