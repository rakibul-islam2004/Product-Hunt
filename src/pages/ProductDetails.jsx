import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsCard from "../components/ProductDetailsCard";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import useAuth from "../hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(5);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://product-hunt-server-eight.vercel.app/product/${id}`
      );
      const productData = response.data?.product;

      if (productData) {
        setProduct(productData);
        setReviews(productData.reviews || []);
      } else {
        setError("Product data not found.");
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  // Handle Upvote
  const handleUpvote = async () => {
    try {
      const response = await axios.post(
        `https://product-hunt-server-eight.vercel.app/upvote/${id}`,
        {
          userId: user.uid,
        }
      );

      // Update the UI based on the server's response
      if (response.data.message === "Upvote added") {
        setProduct((prev) => ({
          ...prev,
          upvotes: Array.isArray(prev.upvotes)
            ? [...prev.upvotes, user.uid]
            : [user.uid],
        }));
      } else if (response.data.message === "Upvote removed") {
        setProduct((prev) => ({
          ...prev,
          upvotes: Array.isArray(prev.upvotes)
            ? prev.upvotes.filter((u) => u !== user.uid)
            : [],
        }));
      }
    } catch (err) {
      console.error("Error upvoting:", err);
      alert("Failed to upvote. Please try again.");
    }
  };

  // Determine ownership and upvote status
  const isOwner = product?.ownerId === user.uid;
  const hasUpvoted =
    Array.isArray(product?.upvotes) && product.upvotes.includes(user.uid);

  // Handle Review Submit
  const handleReviewSubmit = async (reviewText) => {
    try {
      const newReview = {
        reviewDescription: reviewText,
        rating: userRating,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL || "",
      };

      await axios.post(
        `https://product-hunt-server-eight.vercel.app/reviews/${id}`,
        newReview
      );

      setReviews((prev) => [...prev, newReview]);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-8">
          <p>Loading product details...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto p-8">
          <p className="text-red-500">{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <ProductDetailsCard
          product={product}
          onUpvote={isOwner ? null : handleUpvote} // Disable if the user is the owner
          reviews={reviews}
          onReviewSubmit={handleReviewSubmit}
          userRating={userRating}
          setUserRating={setUserRating}
          hasUpvoted={hasUpvoted} // Pass whether the user has upvoted
          isOwner={isOwner} // Pass whether the user is the owner
          totalUpvotes={product?.upvotes?.length || 0} // Pass total upvotes
        />
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
