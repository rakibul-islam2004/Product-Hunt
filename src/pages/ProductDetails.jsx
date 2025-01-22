import React, { useState, useEffect } from "react";
import ProductDetailsCard from "../components/ProductDetailsCard";
import ReviewCard from "../components/ReviewCard";
import UpvoteButton from "../components/UpvoteButton";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${match.params.id}`
        );
        setProduct(response.data.product);
        setReviews(response.data.product.reviews);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [match.params.id]);

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <ProductDetailsCard product={product} />
        <div className="mt-8 flex justify-between items-center">
          <UpvoteButton productId={product.id} />
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Reviews</h3>
          <div className="mt-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
